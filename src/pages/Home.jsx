import Converter from "../components/Converter";
// import AdBanner from "../components/AdBanner";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* <AdBanner /> */}
      <Converter />
      {/* <AdBanner /> */}

      {/* SEO Articles Section */}
      <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Convert Videos to MP3 Instantly - Free Online Converter
        </h1>

        <div className="space-y-10">
          <article>
            <h2 className="text-2xl font-semibold mb-4">
              How to Convert YouTube to MP3 in Seconds
            </h2>
            <p className="text-gray-600 mb-4">
              Transform any YouTube video into high-quality MP3 audio files with
              our free online converter. Follow these simple steps:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Copy the YouTube video URL</li>
              <li>Paste it in our converter above</li>
              <li>Click Convert Now and download your MP3</li>
            </ol>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-4">
              MP4 to MP3 Converter - Extract Audio from Videos
            </h2>
            <p className="text-gray-600">
              Our online MP4 to MP3 converter lets you quickly extract audio
              from any video file. Perfect for creating music files, podcasts,
              or audio recordings from your video content. Supported formats
              include MP4, AVI, MOV, and more.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-4">
              Why Choose Our Video to MP3 Converter?
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>100% Free Online Conversion</li>
              <li>No Registration Required</li>
              <li>High-Quality MP3 Output</li>
              <li>Fast Conversion Speed</li>
              <li>Supports Multiple Platforms (YouTube, Vimeo, Local Files)</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-4">
              Best YouTube to MP3 Converter 2023
            </h2>
            <p className="text-gray-600">
              Looking for the most reliable YT to MP3 converter? Our tool offers
              seamless YouTube video conversion with crystal clear audio
              quality. Convert entire playlists or single videos without any
              software installation.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="border rounded p-4">
                <h3 className="font-semibold mb-2">
                  Is converting YouTube to MP3 legal?
                </h3>
                <p className="text-gray-600">
                  Our converter is intended for personal use and content you
                  have rights to convert. Please respect copyright laws and only
                  convert videos you're authorized to use.
                </p>
              </div>
              <div className="border rounded p-4">
                <h3 className="font-semibold mb-2">
                  What audio quality do you provide?
                </h3>
                <p className="text-gray-600">
                  We preserve the original audio quality up to 320kbps MP3
                  format, ensuring professional-grade results for all your
                  conversions.
                </p>
              </div>
            </div>
          </article>
          <article>
            <h2 className="text-2xl font-semibold mb-4">
              Top 5 Reasons to Convert YouTube Videos to MP3
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="mb-3">
                1. <strong>Create Portable Music Libraries:</strong> Convert
                your favorite YouTube music videos to MP3 and listen offline
                anywhere
              </p>
              <p className="mb-3">
                2. <strong>Podcast Extraction:</strong> Save audio from
                educational YouTube content for on-the-go learning
              </p>
              <p className="mb-3">
                3. <strong>Content Creation:</strong> Use audio tracks from
                videos for your own creative projects
              </p>
              <p className="mb-3">
                4. <strong>Storage Efficiency:</strong> MP3 files take up 90%
                less space than video files
              </p>
              <p className="mb-3">
                5. <strong>Accessibility:</strong> Create audio versions of
                content for visually impaired users
              </p>
            </div>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-4">
              Technical Specifications
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Supported Input Formats</h3>
                <ul className="list-disc list-inside">
                  <li>MP4 (H.264, H.265)</li>
                  <li>AVI (Xvid, DivX)</li>
                  <li>MOV (QuickTime)</li>
                  <li>WEBM (VP9)</li>
                  <li>YouTube URLs</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Output Specifications</h3>
                <ul className="list-disc list-inside">
                  <li>MP3 Format</li>
                  <li>128kbps, 192kbps, 320kbps Quality</li>
                  <li>ID3 Tag Support</li>
                  <li>44.1kHz Sample Rate</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
      {/* Add this script tag */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              /* Your FAQ structure */
            },
          ],
        })}
      </script>
    </div>
  );
}
