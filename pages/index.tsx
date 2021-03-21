import { Box, HStack, Link as ChakraLink, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import Link from 'next/link'

import { Layout } from '~components/layout'
import Profile from '~components/profile'

import { getAllNotes } from '~lib/note'

function HomePage({ notes }: any) {
  return (
    <Layout title="shimba.co">
      <Box mt="6" w="100%">
        {notes.map((note: any) => {
          return (
            <HStack key={note.slug} spacing={6}>
              <Box textAlign="right" w="50%">
                <Text color="coolGray.500" fontSize="sm">
                  {dayjs(note.publishedAt).format('MMMM D, YYYY')}
                </Text>
              </Box>

              <Box w="50%">
                <Link href={`/${note.slug}`}>
                  <ChakraLink>{note.title}</ChakraLink>
                </Link>
              </Box>
            </HStack>
          )
        })}
      </Box>
      <Profile />
    </Layout>
  )
}

export async function getStaticProps({ params }: any) {
  const notes = getAllNotes(['slug', 'publishedAt', 'title'])

  return {
    props: {
      notes,
    },
  }
}

export default HomePage
