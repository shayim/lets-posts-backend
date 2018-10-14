import { JsonController, Get, Post, Body, Res } from 'routing-controllers'
import { Response } from 'express'
import { PostModel, IPost } from '../models/post'

let samplePosts = [
  { title: 'First post title', content: 'First post content' },
  { title: 'Second post title', content: 'Second post content' },
  { title: 'Third post title', content: 'Thirds post content' },
]

@JsonController('/Posts')
export class PostController {
  @Get('/')
  async getAll(@Res() res: Response) {
    // return samplePosts
    try {
      const docs: IPost[] = await PostModel.find({})
      const posts = docs.map(p => {
        return { _id: p.id, title: p.title, content: p.content }
      })
      return posts
    } catch (err) {
      return res.status(500).json({ error: err })
    }
    // return PostModel.find({}, { id: 1, title: 1, content: 1 })
    //   .then(posts => posts)
    //   .catch(err => res.status(500).json({ error: err }))
    // return PostModel.find((err, doc) => {
    //   if (err) return res.status(500).json({ error: err })
    //   return doc
    // })
  }

  @Post('/')
  async Post(@Body() post: IPost, @Res() res: Response) {
    try {
      const newPost = new PostModel(post)
      const postSaved = await newPost.save()

      return res.status(201).json(postSaved)
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }
}
