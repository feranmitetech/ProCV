'use client'

import { useMemo, useState } from 'react'

export interface SocialLink {
  platform: string
  url: string
  category: string
}

const PLATFORMS: { category: string; items: { name: string; placeholder: string }[] }[] = [
  {
    category: 'Portfolio & Personal',
    items: [
      { name: 'Portfolio / Website', placeholder: 'yourportfolio.com' },
      { name: 'Linktree', placeholder: 'linktr.ee/yourname' },
      { name: 'Calendly', placeholder: 'calendly.com/yourname' },
      { name: 'Polywork', placeholder: 'polywork.com/yourname' },
      { name: 'FlowCV', placeholder: 'flowcv.io/yourname' },
      { name: 'AngelList', placeholder: 'angel.co/yourname' },
    ],
  },
  {
    category: 'Professional Networks',
    items: [
      { name: 'LinkedIn', placeholder: 'linkedin.com/in/yourname' },
      { name: 'Xing', placeholder: 'xing.com/profile/yourname' },
      { name: 'Handshake', placeholder: 'joinhandshake.com/yourname' },
      { name: 'Indeed', placeholder: 'indeed.com/me/yourname' },
      { name: 'Toptal', placeholder: 'toptal.com/yourname' },
    ],
  },
  {
    category: 'Code & Development',
    items: [
      { name: 'GitHub', placeholder: 'github.com/yourname' },
      { name: 'GitLab', placeholder: 'gitlab.com/yourname' },
      { name: 'Bitbucket', placeholder: 'bitbucket.org/yourname' },
      { name: 'Gitea', placeholder: 'gitea.io/yourname' },
      { name: 'Stack Overflow', placeholder: 'stackoverflow.com/users/yourid' },
      { name: 'CodePen', placeholder: 'codepen.io/yourname' },
      { name: 'Replit', placeholder: 'replit.com/@yourname' },
      { name: 'Devpost', placeholder: 'devpost.com/yourname' },
      { name: 'dev.to', placeholder: 'dev.to/yourname' },
      { name: 'Hashnode', placeholder: 'hashnode.com/@yourname' },
      { name: 'CodinGame', placeholder: 'codingame.com/profile/yourname' },
    ],
  },
  {
    category: 'Competitive Programming',
    items: [
      { name: 'LeetCode', placeholder: 'leetcode.com/yourname' },
      { name: 'HackerRank', placeholder: 'hackerrank.com/yourname' },
      { name: 'HackerEarth', placeholder: 'hackerearth.com/@yourname' },
      { name: 'Codeforces', placeholder: 'codeforces.com/profile/yourname' },
      { name: 'CodeChef', placeholder: 'codechef.com/users/yourname' },
      { name: 'Codewars', placeholder: 'codewars.com/users/yourname' },
      { name: 'GeeksforGeeks', placeholder: 'geeksforgeeks.org/user/yourname' },
      { name: 'StopStalk', placeholder: 'stopstalk.com/user/profile/yourname' },
      { name: 'Coding Ninjas', placeholder: 'codingninjas.com/yourname' },
    ],
  },
  {
    category: 'Cybersecurity',
    items: [
      { name: 'TryHackMe', placeholder: 'tryhackme.com/p/yourname' },
      { name: 'Hack The Box', placeholder: 'hackthebox.com/profile/yourname' },
      { name: 'HackerOne', placeholder: 'hackerone.com/yourname' },
    ],
  },
  {
    category: 'Design & Creative',
    items: [
      { name: 'Dribbble', placeholder: 'dribbble.com/yourname' },
      { name: 'Behance', placeholder: 'behance.net/yourname' },
      { name: 'Figma', placeholder: 'figma.com/@yourname' },
      { name: 'ArtStation', placeholder: 'artstation.com/yourname' },
      { name: 'DeviantArt', placeholder: 'deviantart.com/yourname' },
      { name: 'VSCO', placeholder: 'vsco.co/yourname' },
      { name: 'Canva', placeholder: 'canva.com/yourname' },
      { name: 'Unsplash', placeholder: 'unsplash.com/@yourname' },
      { name: '500px', placeholder: '500px.com/p/yourname' },
      { name: 'Flickr', placeholder: 'flickr.com/photos/yourname' },
    ],
  },
  {
    category: 'Writing & Publishing',
    items: [
      { name: 'Medium', placeholder: 'medium.com/@yourname' },
      { name: 'Substack', placeholder: 'yourname.substack.com' },
      { name: 'GitBook', placeholder: 'yourname.gitbook.io' },
      { name: 'Hashnode', placeholder: 'hashnode.com/@yourname' },
      { name: 'Blogger', placeholder: 'yourname.blogspot.com' },
      { name: 'Tumblr', placeholder: 'yourname.tumblr.com' },
      { name: 'WordPress', placeholder: 'yourname.wordpress.com' },
      { name: 'Quora', placeholder: 'quora.com/profile/yourname' },
    ],
  },
  {
    category: 'Data & Research',
    items: [
      { name: 'Kaggle', placeholder: 'kaggle.com/yourname' },
      { name: 'Hugging Face', placeholder: 'huggingface.co/yourname' },
      { name: 'Google Scholar', placeholder: 'scholar.google.com/citations?user=yourid' },
      { name: 'ORCID', placeholder: 'orcid.org/yourorcid' },
      { name: 'ResearchGate', placeholder: 'researchgate.net/profile/yourname' },
      { name: 'Scopus', placeholder: 'scopus.com/authid/detail.uri?authorId=yourid' },
      { name: 'Tableau', placeholder: 'public.tableau.com/yourname' },
      { name: 'DataCamp', placeholder: 'datacamp.com/profile/yourname' },
    ],
  },
  {
    category: 'Video & Streaming',
    items: [
      { name: 'YouTube', placeholder: 'youtube.com/@yourname' },
      { name: 'Vimeo', placeholder: 'vimeo.com/yourname' },
      { name: 'TikTok', placeholder: 'tiktok.com/@yourname' },
      { name: 'Twitch', placeholder: 'twitch.tv/yourname' },
      { name: 'Itch.io', placeholder: 'yourname.itch.io' },
    ],
  },
  {
    category: 'Audio & Podcasts',
    items: [
      { name: 'SoundCloud', placeholder: 'soundcloud.com/yourname' },
      { name: 'Spotify', placeholder: 'open.spotify.com/artist/yourid' },
      { name: 'Audioboom', placeholder: 'audioboom.com/yourname' },
      { name: 'Bandcamp', placeholder: 'yourname.bandcamp.com' },
    ],
  },
  {
    category: 'Social Media',
    items: [
      { name: 'X (Twitter)', placeholder: 'x.com/yourname' },
      { name: 'Instagram', placeholder: 'instagram.com/yourname' },
      { name: 'Facebook', placeholder: 'facebook.com/yourname' },
      { name: 'Threads', placeholder: 'threads.net/@yourname' },
      { name: 'Bluesky', placeholder: 'bsky.app/profile/yourname' },
      { name: 'Mastodon', placeholder: 'mastodon.social/@yourname' },
      { name: 'Reddit', placeholder: 'reddit.com/user/yourname' },
      { name: 'Pinterest', placeholder: 'pinterest.com/yourname' },
      { name: 'Snapchat', placeholder: 'snapchat.com/add/yourname' },
    ],
  },
  {
    category: 'Messaging',
    items: [
      { name: 'Telegram', placeholder: 't.me/yourname' },
      { name: 'WhatsApp', placeholder: 'wa.me/yournumber' },
      { name: 'Discord', placeholder: 'discord.com/users/yourid' },
      { name: 'Skype', placeholder: 'skype:yourname' },
      { name: 'Slack', placeholder: 'slack.com/yourworkspace' },
    ],
  },
  {
    category: 'Freelance & Marketplace',
    items: [
      { name: 'Upwork', placeholder: 'upwork.com/fl/yourname' },
      { name: 'Fiverr', placeholder: 'fiverr.com/yourname' },
      { name: 'Freelancer', placeholder: 'freelancer.com/u/yourname' },
      { name: 'Etsy', placeholder: 'etsy.com/shop/yourshop' },
      { name: 'Product Hunt', placeholder: 'producthunt.com/@yourname' },
      { name: 'Toptal', placeholder: 'toptal.com/resume/yourname' },
    ],
  },
  {
    category: 'Learning & Certificates',
    items: [
      { name: 'Coursera', placeholder: 'coursera.org/user/yourname' },
      { name: 'Udemy', placeholder: 'udemy.com/user/yourname' },
      { name: 'Udacity', placeholder: 'udacity.com/me' },
      { name: 'Pluralsight', placeholder: 'pluralsight.com/authors/yourname' },
      { name: 'Codecademy', placeholder: 'codecademy.com/profiles/yourname' },
      { name: 'Khan Academy', placeholder: 'khanacademy.org/profile/yourname' },
      { name: 'Credly', placeholder: 'credly.com/users/yourname' },
      { name: 'Sololearn', placeholder: 'sololearn.com/profile/yourid' },
      { name: 'DataCamp', placeholder: 'datacamp.com/profile/yourname' },
      { name: 'Qwiklabs', placeholder: 'cloudskillsboost.google/public_profiles/yourname' },
    ],
  },
  {
    category: 'Apps & Games',
    items: [
      { name: 'Google Play', placeholder: 'play.google.com/store/apps/developer?id=yourname' },
      { name: 'App Store', placeholder: 'apps.apple.com/developer/yourname' },
      { name: 'Steam', placeholder: 'steamcommunity.com/id/yourname' },
    ],
  },
  {
    category: 'Other',
    items: [
      { name: 'npm', placeholder: 'npmjs.com/~yourname' },
      { name: 'IMDb', placeholder: 'imdb.com/name/yourid' },
      { name: 'Letterboxd', placeholder: 'letterboxd.com/yourname' },
      { name: 'ReverbNation', placeholder: 'reverbnation.com/yourname' },
      { name: 'OpenSea', placeholder: 'opensea.io/yourname' },
      { name: 'Zoom', placeholder: 'zoom.us/my/yourname' },
    ],
  },
]

// Flatten all platforms for search
const ALL_PLATFORMS = PLATFORMS.flatMap(cat =>
  cat.items.map(item => ({ ...item, category: cat.category }))
)

interface Props {
  links: SocialLink[]
  onChange: (links: SocialLink[]) => void
}

export default function OnlinePresence({ links, onChange }: Props) {
  const [search, setSearch] = useState('')
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const addLink = (platform: string, category: string) => {
    if (links.find(l => l.platform === platform)) return
    onChange([...links, { platform, url: '', category }])
  }

  const updateUrl = (platform: string, url: string) => {
    onChange(links.map(l => l.platform === platform ? { ...l, url } : l))
  }

  const removeLink = (platform: string) => {
    onChange(links.filter(l => l.platform !== platform))
  }

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (query.length < 2) return []
    return ALL_PLATFORMS.filter(p => p.name.toLowerCase().includes(query)).slice(0, 12)
  }, [search])

  const activePlatformNames = new Set(links.map(l => l.platform))

  return (
    <div>
      <h2 className="font-semibold text-gray-900 mb-1">Online presence</h2>
      <p className="text-xs text-gray-500 mb-4">Add the professional links that help recruiters verify your work.</p>

      {/* Search */}
      <div className="relative mb-4">
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
          placeholder="Search platforms: GitHub, Behance, Medium, Kaggle, Fiverr..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-lg leading-none">x</button>
        )}
      </div>

      {/* Search results */}
      {searchResults.length > 0 && (
        <div className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
          <p className="text-xs text-gray-500 mb-2 font-medium">Click to add:</p>
          <div className="flex flex-wrap gap-2">
            {searchResults.map(p => (
              <button
                key={p.name}
                onClick={() => { addLink(p.name, p.category); setSearch('') }}
                disabled={activePlatformNames.has(p.name)}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                  activePlatformNames.has(p.name)
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200 cursor-default'
                    : 'bg-white text-gray-800 border-gray-300 hover:border-emerald-600 hover:text-emerald-800'
                }`}
              >
                {activePlatformNames.has(p.name) ? 'Added ' : '+ '}{p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Added links */}
      {links.length > 0 && (
        <div className="mb-4 space-y-2">
          <p className="text-xs font-semibold text-gray-700 mb-2">Added platforms:</p>
          {links.map(link => (
            <div key={link.platform} className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
              <span className="text-xs font-semibold text-gray-800 w-full sm:w-28 flex-shrink-0">{link.platform}</span>
              <input
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder={ALL_PLATFORMS.find(p => p.name === link.platform)?.placeholder || 'Enter URL'}
                value={link.url}
                onChange={e => updateUrl(link.platform, e.target.value)}
              />
              <button onClick={() => removeLink(link.platform)} className="text-gray-400 hover:text-red-500 flex-shrink-0 text-lg leading-none px-1">x</button>
            </div>
          ))}
        </div>
      )}

      {/* Browse by category */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">Or browse by category:</p>
        <div className="space-y-1">
          {PLATFORMS.map(cat => (
            <div key={cat.category} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button
                onClick={() => setOpenCategory(openCategory === cat.category ? null : cat.category)}
                className="w-full flex justify-between items-center px-4 py-2.5 text-sm font-medium text-gray-800 bg-slate-50 hover:bg-emerald-50 transition-colors text-left"
              >
                <span>{cat.category}</span>
                <span className="text-gray-400 text-xs">{openCategory === cat.category ? 'Close' : 'Open'}</span>
              </button>
              {openCategory === cat.category && (
                <div className="px-4 py-3 flex flex-wrap gap-2 bg-white">
                  {cat.items.map(item => (
                    <button
                      key={item.name}
                      onClick={() => addLink(item.name, cat.category)}
                      disabled={activePlatformNames.has(item.name)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                        activePlatformNames.has(item.name)
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-200 cursor-default'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-600 hover:text-emerald-800'
                      }`}
                    >
                      {activePlatformNames.has(item.name) ? 'Added ' : '+ '}{item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


