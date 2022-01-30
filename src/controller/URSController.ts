import { request} from 'express';

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    // cria o hash para a URL
    const {originURL} = req.body
  }
  

}