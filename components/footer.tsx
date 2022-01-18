import { Box, Center, chakra, HStack, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const ChakraNextImage = chakra(Image);

export const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      bgColor="gray.700"
      color="white"
      px="4"
      py="8"
      textAlign="center"
    >
      <Center>
        <Box height="100px" width="100px" position="relative">
          <ChakraNextImage
            alt="@shimbaco"
            height={100}
            layout="fill"
            rounded="full"
            src="/shimbaco.jpg"
            width={100}
          />
        </Box>
      </Center>

      <Box mt="2">
        <Text fontSize="4xl" fontWeight="bold" lineHeight="2.5rem">
          Shimba, Koji
        </Text>

        <Text color="gray.300" fontSize="xl" fontWeight="semibold">
          @shimbaco
        </Text>
      </Box>

      <HStack justify="center" mt="4" spacing="4">
        <Link
          display="inline-block"
          height="30px"
          href="https://annict.jp/@shimbaco"
          position="relative"
          rel="noopener"
          target="_blank"
          width="30px"
        >
          <ChakraNextImage
            alt="Annict"
            borderRadius="sm"
            height={30}
            layout="fill"
            src="/annict.jpg"
            width={30}
          />
        </Link>

        <Link
          href="https://twitter.com/shimbaco"
          color="#1DA1F2"
          rel="noopener"
          target="_blank"
        >
          <FaTwitter size={30} />
        </Link>

        <Link href="https://github.com/shimbaco" rel="noopener" target="_blank">
          <FaGithub size={30} />
        </Link>
      </HStack>

      <Text mt="4">
        個人でWebサービスを運営したりしているソフトウェアエンジニアです。
        <br />
        趣きのあるアニメの聖地を訪れるのが好き。
      </Text>
    </Box>
  );
};
