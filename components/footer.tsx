import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-neutral-800 px-4 py-8 text-center text-neutral-300">
      <Image
        alt="@shimbaco"
        className="rounded-full"
        height={100}
        src="/shimbaco.jpg"
        width={100}
      />

      <div>
        <div className="text-4xl">Shimba, Koji</div>
        <div className="text-xl text-neutral-400">@shimbaco</div>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <Link href="https://annict.jp/@shimbaco">
          <a className="p-[2px]" rel="noopener" target="_blank">
            <Image
              alt="Annict"
              className="rounded"
              height={30}
              src="/annict.jpg"
              width={30}
            />
          </a>
        </Link>

        <Link href="https://twitter.com/shimbaco">
          <a className="text-[#1DA1F2]" rel="noopener" target="_blank">
            <FaTwitter size={35} />
          </a>
        </Link>

        <Link href="https://github.com/shimbaco">
          <a rel="noopener" target="_blank">
            <FaGithub size={35} />
          </a>
        </Link>
      </div>

      <p className="mt-4">
        個人でWebサービスを運営したりしているソフトウェアエンジニアです。
        <br />
        趣きのあるアニメの聖地を訪れるのが好き。
      </p>
    </footer>
  );
}
