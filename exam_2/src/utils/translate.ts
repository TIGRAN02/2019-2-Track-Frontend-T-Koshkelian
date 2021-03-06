import fetch, { Response } from 'node-fetch'
import { Caches } from './caches'
import { APIResponse, SmartText } from './types'
import { buildResponse, cacheableErrors } from './errors'

const API_KEY = process.env.REACT_APP_API_KEY

const translated = new Caches<string>()
const errors = new Caches<{}>()

export async function translate(text: string, to: string, from?: string): Promise<string> {
  const req = new SmartText(text, to)

  if (translated.has(req.getEncoded())) return translated.get(req.getEncoded()) || ''
  if (errors.has(req.getEncoded())) throw errors.get(req.getEncoded())

  return fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${encodeURIComponent(text)}&lang=${
      from ? `${from}-${to}` : to
    }&format=plain&options=${from ? '0' : '1'}`,
  )
    .then((response: Response) => response.json())
    .then((data: APIResponse) => {
      if (data.code !== 200) {
        if (cacheableErrors.indexOf(data.code) !== -1) errors.add(req.getEncoded(), buildResponse(data.code))
        throw buildResponse(data.code)
      }

      translated.add(req.getEncoded(), data.text[0])
      return data.text[0]
    })
}
