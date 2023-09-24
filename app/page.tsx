import { auth } from '@/functions/common/auth'
export default async function Home() {
  const user = await auth()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className={`m-0 max-w-[30ch] text-lg text-white`}>
        待っていたぞ{user.name}
      </p>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="/rooms/create"
          className="group rounded-none border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-[#a1080f]"
          target="_blank"
          rel="noopener noreferrer">
          <h2 className={`mb-3 text-2xl font-semibold text-white`}>
            ルーム作成
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm text-white`}>
            あなたがルームマスターとなってゲームを開始します。
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-none border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-[#a1080f]"
          target="_blank"
          rel="noopener noreferrer">
          <h2 className={`mb-3 text-2xl font-semibold text-white`}>
            ルームに参加
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm text-white`}>
            ルームIDを入力してゲームに参加します。
          </p>
        </a>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-none border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-[#a1080f]"
          target="_blank"
          rel="noopener noreferrer">
          <h2 className={`mb-3 text-2xl font-semibold text-white`}>
            ルームを探す
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm text-white`}>
            募集中のルームを探します。
          </p>
        </a>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-none border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-[#a1080f]"
          target="_blank"
          rel="noopener noreferrer">
          <h2 className={`mb-3 text-2xl font-semibold text-white`}>
            ルール{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm text-white`}>
            初心者の方はまずルールを確認しよう
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-none border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-[#a1080f]"
          target="_blank"
          rel="noopener noreferrer">
          <h2 className={`mb-3 text-2xl font-semibold text-white`}>
            役職{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm text-white`}>
            それぞれの役職の特徴を紹介
          </p>
        </a>
      </div>
    </main>
  )
}
