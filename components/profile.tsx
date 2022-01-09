import { FaGithubSquare, FaTwitterSquare } from 'react-icons/fa';
import Image from 'next/image';

export default function Profile() {
  return (
    <footer className="bg-neutral-800 text-center">
      <div className="card-body">
        <h1 className="card-title">Shimba, Koji</h1>
        <div className="card-subtitle h3 mb-5 text-muted">@shimbaco</div>

        <div className="d-flex justify-content-center mb-5">
          <div className="mx-5" style={{ position: 'relative', top: '2px' }}>
            <a
              href="https://annict.jp/@shimbaco"
              rel="noopener"
              target="_blank"
            >
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
            <a
              className="text-body"
              href="https://twitter.com/shimbaco"
              rel="noopener"
              target="_blank"
            >
              <FaTwitterSquare />
            </a>
          </div>

          <div className="mx-5">
            <a
              className="text-body"
              href="https://github.com/shimbaco"
              rel="noopener"
              target="_blank"
            >
              <FaGithubSquare />
            </a>
          </div>
        </div>

        <p className="mb-0">
          Webアプリケーションを作っています。
          <br />
          趣きのあるアニメの聖地を訪れて余韻に浸るのが好き。
        </p>
      </div>
    </footer>
  );
}
