import { getRanges, getBrands, getPosts } from '@/lib/data'
import { HomePage } from '@/components/pages/HomePage'

export default async function Home() {
  const [ranges, brands, posts] = await Promise.all([getRanges(), getBrands(), getPosts()])
  return <HomePage ranges={ranges} brands={brands} posts={posts} />
}
