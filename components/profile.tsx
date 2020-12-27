import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'

export default function Profile() {
  return (
    <footer className="bg-opacity-90 bg-pink-100 p-5 rounded text-black text-center text-opacity-80">
      <h1 className="font-bold mb-5 text-3xl">
        Shimba, Koji
        <div className="text-base text-black text-opacity-60">
          @shimbaco
        </div>
      </h1>

      <div className="content-center flex justify-center mb-5 text-gray-900 text-opacity-90">
        <div className="mx-5" style={{ position: 'relative', top: '2px' }}>
          <a href="https://annict.jp/@shimbaco" rel="noopener" target="_blank">
            <Image
              alt="Annict"
              className="rounded"
              height={35}
              src="/annict.jpg"
              width={35}
            />
          </a>
        </div>

        <div className="mx-5">
          <a href="https://twitter.com/shimbaco" rel="noopener" target="_blank">
            <FontAwesomeIcon icon={faTwitterSquare} style={{ fontSize: '40px' }} />
          </a>
        </div>

        <div className="mx-5">
          <a href="https://github.com/shimbaco" rel="noopener" target="_blank">
            <FontAwesomeIcon icon={faGithubSquare} style={{ fontSize: '40px' }} />
          </a>
        </div>
      </div>

      <p>
        Webアプリケーションを作っています。<br />
        趣きのあるアニメの聖地を訪れて余韻に浸るのが好き。
      </p>
    </footer>
  )
}
