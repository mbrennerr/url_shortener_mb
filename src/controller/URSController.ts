import { req, res} from 'express';
import shortId from 'shortid'
import { config } from '../config/Constants'
import { URLModel } from '../database/model/URL'
export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body /*verifica se a URL ja existe no Banco;*/
    const url = await URLModel.findOne({ originURL })
    if (url) {
      res.json(url) /*Cria o hash para a URL*/
      return
    }
    const hash = shortId.generate()
    const shortURL = `${config.API_URL}/${hash}`
    const newURL = await URLModel.create({ hash, shortURL, originURL })/*Salva a nova URL no banco*/
    res.json(newURL)/*Retorna a URL que foi salva*/    
  }
  
  public async redirect(req: Request, response: Response): Promise<void> {
    const {hash} = req.params /* pega o hash  da URL*/
    const url = await URLModel.findOne({ hash })

		if (url) {
			res.redirect(url.originURL)
			return
		}

		response.status(400).json({ error: 'URL not found' })

    }
  }
}