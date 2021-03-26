import axios from "axios"

export class PostGateway {
  public async getPosts() {
    const posts = await axios.get("https://dinotest.wpengine.com/wp-json/wp/v2/posts")
    return Array.isArray(posts?.data) ? posts.data : []
  }
}
