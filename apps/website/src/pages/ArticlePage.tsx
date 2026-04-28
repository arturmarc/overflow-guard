import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

import cloudflareEnglish from '@/assets/cloudflare-toolbar-en.png'
import cloudflareGerman from '@/assets/cloudflare-toolbar-ger.png'
import cloudflarePolish from '@/assets/cloudflare-toolbar-pl.png'
import googleNavbarOverflow from '@/assets/google-site-navbar-overflow-example.png'
import openAiNavbarOverflow from '@/assets/openAI-navbar-overflow.png'
import { SiteFooter, SiteHeader } from './components/site-shell'

function ExternalLink({
  children,
  href,
}: {
  children: ReactNode
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-primary underline decoration-primary/30 underline-offset-4 transition hover:decoration-primary"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )
}

function ArticleImage({ alt, src }: { alt: string; src: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full rounded-xl border border-border/70 bg-background"
      loading="lazy"
    />
  )
}

function ArticleSection({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

export default function ArticlePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader activeMode="article" />

      <main className="mx-auto flex max-w-5xl flex-col gap-20 px-6 pb-20 pt-16 md:px-10 md:pt-24">
        <article className="flex flex-col gap-16">
          <header className="flex max-w-3xl flex-col gap-7 animate-fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              OverflowGuard
            </p>
            <h1 className="font-display text-[2.75rem] leading-[1.08] font-semibold tracking-tight md:text-7xl md:leading-[1.06]">
              Responsive Toolbars and Navbars, Done Right
            </h1>
          </header>

          <ArticleSection title="Look ma, no media queries!">
            <p>
              Responsive design is basically solved nowadays, right? We&apos;ve
              been doing media queries for over a decade, we have{' '}
              <code>@container</code> queries now and cool tricks like CSS
              Grid&apos;s <code>repeat(auto-fit, minmax())</code>.
            </p>
            <p>
              All this works pretty well for the most part, especially when
              things are static, but if you are dealing with dynamic content
              that&apos;s when things can get less than perfect 😅. It&apos;s
              especially easy with toolbars, even for the pros:
            </p>
          </ArticleSection>

          <section className="flex flex-col gap-6">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Common failures:
            </h2>

            <div className="grid gap-5">
              <figure className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-4 md:p-5">
                <figcaption className="text-lg leading-relaxed text-muted-foreground">
                  <ExternalLink href="https://blog.google/">
                    blog.google at 1025px
                  </ExternalLink>{' '}
                  😥
                </figcaption>
                <ArticleImage
                  src={googleNavbarOverflow}
                  alt="Google Blog navbar overflowing around 1025px."
                />
              </figure>

              <figure className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-4 md:p-5">
                <figcaption className="text-lg leading-relaxed text-muted-foreground">
                  <ExternalLink href="https://www.cloudflare.com/">
                    cloudflare.com
                  </ExternalLink>{' '}
                  English is fine, but German or Polish not so much 😭
                </figcaption>
                <div className="grid gap-3">
                  <ArticleImage
                    src={cloudflareEnglish}
                    alt="Cloudflare toolbar fitting in English."
                  />
                  <ArticleImage
                    src={cloudflareGerman}
                    alt="Cloudflare toolbar getting tight in German."
                  />
                  <ArticleImage
                    src={cloudflarePolish}
                    alt="Cloudflare toolbar getting tight in Polish."
                  />
                </div>
              </figure>

              <figure className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-4 md:p-5">
                <figcaption className="text-lg leading-relaxed text-muted-foreground">
                  <ExternalLink href="https://developers.openai.com/api/doc">
                    OpenAI docs at below 820px wide
                  </ExternalLink>{' '}
                  even not dynamic just breaks 🤮
                </figcaption>
                <ArticleImage
                  src={openAiNavbarOverflow}
                  alt="OpenAI docs navbar overflowing below 820px."
                />
              </figure>
            </div>
          </section>

          <section className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              This happens because you can&apos;t solve this when there is
              dynamic content in pure CSS, where you have to rely on fixed pixel
              breakpoints. To solve it correctly, you&apos;re gonna need some
              JS, or smart tools 🤓
            </p>
            <p>
              The way to fix all of those is to have a way to detect when those
              navbars overflow. It&apos;s actually not that difficult and a
              competent AI agent can whip out some{' '}
              <ExternalLink href="https://codepen.io/arturmarc/pen/JoRaaqP">
                HTML+JS
              </ExternalLink>{' '}
              or{' '}
              <ExternalLink href="https://stackblitz.com/edit/responive-navbar-react-ai?file=src%2FResponsiveNav.tsx">
                React
              </ExternalLink>{' '}
              code.
            </p>
          </section>

          <ArticleSection title="OverflowGuard to the rescue 🛟">
            <p>
              And you can stop here and call it a day I guess 🤷‍♂️. But we can
              make this even easier by using a smart tool:{' '}
              <strong className="font-semibold text-foreground">
                OverflowGuard
              </strong>
              .
            </p>
            <p>
              It does exactly what it says on the tin 🏷️: it detects overflow
              and lets you swap in alternative styles or content.
            </p>
            <p>It has two flavours:</p>
            <ul className="flex list-disc flex-col gap-4 pl-6">
              <li>
                <strong className="font-semibold text-foreground">
                  <ExternalLink href="https://overflow-guard.vercel.app/html">
                    Pure HTML version 💎
                  </ExternalLink>
                </strong>
                : a custom element, useful when doing vanilla HTML or using
                frameworks like Astro, see{' '}
                <ExternalLink href="https://codepen.io/arturmarc/pen/gbwdBgG">
                  how the above example working using that
                </ExternalLink>{' '}
                (notice no JS anymore 😉)
              </li>
              <li>
                <strong className="font-semibold text-foreground">
                  <ExternalLink href="https://overflow-guard.vercel.app/react">
                    React component
                  </ExternalLink>
                </strong>
                : makes it trivial to adopt this kind of responsiveness as you
                can see in the{' '}
                <ExternalLink href="https://stackblitz.com/edit/responive-navbar-react-overflow-guard?file=src%2FResponsiveNav.tsx">
                  adjusted React example
                </ExternalLink>
              </li>
            </ul>
            <p>
              Navbars are just the most common example. Other use cases you
              might easily find:
            </p>
          </ArticleSection>

          <ArticleSection title="Removing labels from buttons">
            <p>
              That&apos;s a useful way to keep a toolbar compact when horizontal
              space gets tight. Toolbars with buttons are notoriously dynamic
              (privileges, translations, context) so it&apos;s sometimes
              impossible to find good hard coded breakpoints.
            </p>
            <ArticleImage
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nqkvwg798wxjl4hkktw7.gif"
              alt="Toolbar buttons collapsing from labels to icons."
            />
            <p>
              Check out a{' '}
              <ExternalLink href="https://codepen.io/arturmarc/pen/JoRgmeE">
                HTML example
              </ExternalLink>
              , and a{' '}
              <ExternalLink href="https://stackblitz.com/edit/vitejs-vite-hxtayrqh?file=src%2FResizableHarness.tsx,src%2FApp.tsx,src%2Fstyles.css&terminal=dev">
                React example
              </ExternalLink>
            </p>
          </ArticleSection>

          <ArticleSection title='"Read more..."'>
            <p>
              Let&apos;s not limit ourselves to the horizontal, Overflow Guard
              works perfectly well in the vertical ↕️ direction. Here&apos;s
              something you might want to do, have a max height on a box and
              show a &quot;read more&quot; button if the content inside
              overflows.
            </p>
            <p>
              Again easily doable in{' '}
              <ExternalLink href="https://codepen.io/arturmarc/pen/zxKgXra">
                HTML
              </ExternalLink>{' '}
              or{' '}
              <ExternalLink href="https://stackblitz.com/edit/vitejs-vite-wedfqtkt?file=package.json,vite.config.ts,src%2Fmain.tsx,src%2FApp.tsx,src%2Fstyles.css,src%2Fvisuals.tsx,src%2FResizableHarness.tsx&terminal=dev">
                React
              </ExternalLink>
              .
            </p>
            <ArticleImage
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7xopz9vr37tpmklwlmmy.gif"
              alt="Read more button appearing when content overflows vertically."
            />
          </ArticleSection>

          <ArticleSection title='A "greedy nav" 🧭 🍽️'>
            <p>
              Leaving the best for last: A robust pattern that&apos;s good for
              dynamic navbars called &quot;greedy nav&quot; which you can find
              for example on another{' '}
              <ExternalLink href="https://developer.chrome.com/">
                Google page
              </ExternalLink>{' '}
              that actually works correctly 😉.
            </p>
            <p>
              You can nest OverflowGuard so it&apos;s quite easy to use it to
              build a greedy nav, especially in{' '}
              <ExternalLink href="https://stackblitz.com/edit/vitejs-vite-ydwytwhk?file=src%2FApp.tsx">
                React
              </ExternalLink>
              .
            </p>
            <p>
              It&apos;s doable in{' '}
              <ExternalLink href="https://codepen.io/arturmarc/pen/bNwXJXY">
                raw HTML
              </ExternalLink>{' '}
              too, if you&apos;re ok with all the extra nesting 😅 (notably
              still accessible), or adding{' '}
              <ExternalLink href="https://codepen.io/arturmarc/pen/dPpxEgR">
                some extra JS
              </ExternalLink>
              .
            </p>
          </ArticleSection>

          <ArticleSection title="Give it a go 🏃">
            <p>
              Once you have{' '}
              <strong className="font-semibold text-foreground">
                <ExternalLink href="https://overflow-guard.vercel.app/">
                  OverflowGuard
                </ExternalLink>
              </strong>{' '}
              in your toolbag I am sure it will unlock some cool tricks 🪄 you
              never thought could be so easy to implement. Also mention it to
              your designers 🎨. They tend to work in fixed breakpoints 🙄, but
              with this capability they can lean into more fluid and content
              driven design.
            </p>
          </ArticleSection>
        </article>

        <SiteFooter
          pills={[
            'Content-aware UI',
            'React component',
            'HTML custom element',
            'No magic breakpoints',
          ]}
        />
      </main>
    </div>
  )
}
