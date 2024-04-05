import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Vote',
      action: 'link',
      target: `https://60e9-2405-201-2002-224f-a8b9-1bc-346-bd7b.ngrok-free.app`,
    },
    {
      label: 'Next',
      action: 'link',
      target: `https://60e9-2405-201-2002-224f-a8b9-1bc-346-bd7b.ngrok-free.app`,
    }
  ],
  postUrl: `${NEXT_PUBLIC_URL}/api/prs`,
  image: `${NEXT_PUBLIC_URL}/google.png`
});

function hellow ()
{
  alert("hellow world")
}
export const metadata: Metadata = {
  title: 'Google Open Frame',
  description: 'Interoperable Frames',
  openGraph: {
    title: 'Google Open Frame',
    description: 'Interoperable Frames',
    images: [
      `${NEXT_PUBLIC_URL}/meme1.png`,
    ],
  },
  other: {
    ...frameMetadata,
    'of:accepts:xmtp': '2024-02-01',
  },
};

export default function Page() {
  return (
    <>
      <img src={ '/meme1.png' } />
      
    </>
  );
}
