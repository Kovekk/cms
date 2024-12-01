export class Document{
  public _id: string|null
  // POSSIBLE ERROR SITE
  public id: string
  public name: string
  public description: string
  public url: string
  public children: Document[]|null

  constructor(id: string, name: string, description: string, url: string, children: Document[]|null, _id?: string) {
    this.id = id
    this.name = name
    this.description = description
    this.url = url
    this.children = children
    if (_id) {this._id = _id} else {this._id = null}
  }
}