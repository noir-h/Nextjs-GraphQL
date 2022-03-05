import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
// *Queryで対応した型を付けれる
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: VFC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    // fetchPolicy: 'network-only',
    fetchPolicy: 'cache-and-network',
    //fetchPolicy: 'cache-first',
    //fetchPolicy: 'no-cache',

    // network-only => 常にサーバーサイドにアクセスしてcacheに保存する
    // cache-and-network => 一旦はcacheを取得して、その後サーバーサイドにアクセスしてデータを上書きする
    // cache-first => always see cache data, サーバーサイドで変更があっても反映できない
    // no-cache => like a axios, don't save in cache
  })
  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
{console.log(data)}
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}
export default FetchMain