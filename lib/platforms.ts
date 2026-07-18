export interface Platform {
  id: string
  label: string
  category: string
  placeholder: string
}

export const PLATFORMS: Platform[] = [
  // Professional
  { id: 'linkedin', label: 'LinkedIn', category: 'Professional', placeholder: 'linkedin.com/in/yourname' },
  { id: 'portfolio', label: 'Portfolio / Website', category: 'Professional', placeholder: 'yourportfolio.com' },
  { id: 'resume', label: 'Online Resume', category: 'Professional', placeholder: 'read.cv/yourname' },
  { id: 'xing', label: 'Xing', category: 'Professional', placeholder: 'xing.com/profile/yourname' },
  { id: 'polywork', label: 'Polywork', category: 'Professional', placeholder: 'polywork.com/yourname' },
  { id: 'angelist', label: 'AngelList / Wellfound', category: 'Professional', placeholder: 'wellfound.com/u/yourname' },
  { id: 'toptal', label: 'Toptal', category: 'Professional', placeholder: 'toptal.com/resume/yourname' },
  { id: 'upwork', label: 'Upwork', category: 'Professional', placeholder: 'upwork.com/freelancers/yourname' },
  { id: 'fiverr', label: 'Fiverr', category: 'Professional', placeholder: 'fiverr.com/yourname' },
  { id: 'freelancer', label: 'Freelancer', category: 'Professional', placeholder: 'freelancer.com/u/yourname' },
  { id: 'handshake', label: 'Handshake', category: 'Professional', placeholder: 'joinhandshake.com/yourname' },
  { id: 'indeed', label: 'Indeed', category: 'Professional', placeholder: 'indeed.com/me/yourname' },
  { id: 'calendly', label: 'Calendly', category: 'Professional', placeholder: 'calendly.com/yourname' },
  { id: 'linktree', label: 'Linktree', category: 'Professional', placeholder: 'linktr.ee/yourname' },
  { id: 'flowcv', label: 'FlowCV', category: 'Professional', placeholder: 'flowcv.com/yourname' },

  // Dev & Code
  { id: 'github', label: 'GitHub', category: 'Dev & Code', placeholder: 'github.com/yourname' },
  { id: 'gitlab', label: 'GitLab', category: 'Dev & Code', placeholder: 'gitlab.com/yourname' },
  { id: 'bitbucket', label: 'Bitbucket', category: 'Dev & Code', placeholder: 'bitbucket.org/yourname' },
  { id: 'gitea', label: 'Gitea', category: 'Dev & Code', placeholder: 'gitea.io/yourname' },
  { id: 'stackoverflow', label: 'Stack Overflow', category: 'Dev & Code', placeholder: 'stackoverflow.com/users/yourid' },
  { id: 'leetcode', label: 'LeetCode', category: 'Dev & Code', placeholder: 'leetcode.com/yourname' },
  { id: 'hackerrank', label: 'HackerRank', category: 'Dev & Code', placeholder: 'hackerrank.com/yourname' },
  { id: 'hackerearth', label: 'HackerEarth', category: 'Dev & Code', placeholder: 'hackerearth.com/@yourname' },
  { id: 'codepen', label: 'CodePen', category: 'Dev & Code', placeholder: 'codepen.io/yourname' },
  { id: 'replit', label: 'Replit', category: 'Dev & Code', placeholder: 'replit.com/@yourname' },
  { id: 'codeforces', label: 'Codeforces', category: 'Dev & Code', placeholder: 'codeforces.com/profile/yourname' },
  { id: 'codewars', label: 'Codewars', category: 'Dev & Code', placeholder: 'codewars.com/users/yourname' },
  { id: 'codinggame', label: 'CodinGame', category: 'Dev & Code', placeholder: 'codingame.com/profile/yourname' },
  { id: 'devpost', label: 'Devpost', category: 'Dev & Code', placeholder: 'devpost.com/yourname' },
  { id: 'npm', label: 'npm', category: 'Dev & Code', placeholder: 'npmjs.com/~yourname' },
  { id: 'tryhackme', label: 'TryHackMe', category: 'Dev & Code', placeholder: 'tryhackme.com/p/yourname' },
  { id: 'hackthebox', label: 'Hack The Box', category: 'Dev & Code', placeholder: 'hackthebox.com/profile/yourname' },
  { id: 'hackerone', label: 'HackerOne', category: 'Dev & Code', placeholder: 'hackerone.com/yourname' },
  { id: 'stopstalk', label: 'StopStalk', category: 'Dev & Code', placeholder: 'stopstalk.com/user/profile/yourname' },
  { id: 'geeksforgeeks', label: 'GeeksforGeeks', category: 'Dev & Code', placeholder: 'geeksforgeeks.org/user/yourname' },
  { id: 'sololearn', label: 'Sololearn', category: 'Dev & Code', placeholder: 'sololearn.com/profile/yourname' },

  // Writing & Content
  { id: 'medium', label: 'Medium', category: 'Writing & Content', placeholder: 'medium.com/@yourname' },
  { id: 'substack', label: 'Substack', category: 'Writing & Content', placeholder: 'yourname.substack.com' },
  { id: 'hashnode', label: 'Hashnode', category: 'Writing & Content', placeholder: 'hashnode.com/@yourname' },
  { id: 'devto', label: 'dev.to', category: 'Writing & Content', placeholder: 'dev.to/yourname' },
  { id: 'gitbook', label: 'GitBook', category: 'Writing & Content', placeholder: 'yourname.gitbook.io' },
  { id: 'blogger', label: 'Blogger', category: 'Writing & Content', placeholder: 'yourblog.blogspot.com' },
  { id: 'wordpress', label: 'WordPress', category: 'Writing & Content', placeholder: 'yourname.wordpress.com' },
  { id: 'tumblr', label: 'Tumblr', category: 'Writing & Content', placeholder: 'yourname.tumblr.com' },
  { id: 'quora', label: 'Quora', category: 'Writing & Content', placeholder: 'quora.com/profile/yourname' },

  // Design & Creative
  { id: 'dribbble', label: 'Dribbble', category: 'Design & Creative', placeholder: 'dribbble.com/yourname' },
  { id: 'behance', label: 'Behance', category: 'Design & Creative', placeholder: 'behance.net/yourname' },
  { id: 'figma', label: 'Figma', category: 'Design & Creative', placeholder: 'figma.com/@yourname' },
  { id: 'artstation', label: 'ArtStation', category: 'Design & Creative', placeholder: 'artstation.com/yourname' },
  { id: 'deviantart', label: 'DeviantArt', category: 'Design & Creative', placeholder: 'deviantart.com/yourname' },
  { id: 'canva', label: 'Canva', category: 'Design & Creative', placeholder: 'canva.com/@yourname' },
  { id: 'unsplash', label: 'Unsplash', category: 'Design & Creative', placeholder: 'unsplash.com/@yourname' },
  { id: 'vsco', label: 'VSCO', category: 'Design & Creative', placeholder: 'vsco.co/yourname' },
  { id: 'flickr', label: 'Flickr', category: 'Design & Creative', placeholder: 'flickr.com/photos/yourname' },
  { id: '500px', label: '500px', category: 'Design & Creative', placeholder: '500px.com/p/yourname' },

  // Data & Research
  { id: 'kaggle', label: 'Kaggle', category: 'Data & Research', placeholder: 'kaggle.com/yourname' },
  { id: 'tableau', label: 'Tableau', category: 'Data & Research', placeholder: 'public.tableau.com/profile/yourname' },
  { id: 'googlescholar', label: 'Google Scholar', category: 'Data & Research', placeholder: 'scholar.google.com/citations?user=yourid' },
  { id: 'researchgate', label: 'ResearchGate', category: 'Data & Research', placeholder: 'researchgate.net/profile/yourname' },
  { id: 'orcid', label: 'ORCID', category: 'Data & Research', placeholder: 'orcid.org/0000-0000-0000-0000' },
  { id: 'scopus', label: 'Scopus', category: 'Data & Research', placeholder: 'scopus.com/authid/yourname' },
  { id: 'huggingface', label: 'Hugging Face', category: 'Data & Research', placeholder: 'huggingface.co/yourname' },
  { id: 'datacamp', label: 'DataCamp', category: 'Data & Research', placeholder: 'datacamp.com/profile/yourname' },

  // Video & Audio
  { id: 'youtube', label: 'YouTube', category: 'Video & Audio', placeholder: 'youtube.com/@yourchannel' },
  { id: 'tiktok', label: 'TikTok', category: 'Video & Audio', placeholder: 'tiktok.com/@yourname' },
  { id: 'twitch', label: 'Twitch', category: 'Video & Audio', placeholder: 'twitch.tv/yourname' },
  { id: 'vimeo', label: 'Vimeo', category: 'Video & Audio', placeholder: 'vimeo.com/yourname' },
  { id: 'soundcloud', label: 'SoundCloud', category: 'Video & Audio', placeholder: 'soundcloud.com/yourname' },
  { id: 'spotify', label: 'Spotify', category: 'Video & Audio', placeholder: 'open.spotify.com/artist/yourid' },
  { id: 'imdb', label: 'IMDb', category: 'Video & Audio', placeholder: 'imdb.com/name/yourid' },
  { id: 'podcasts', label: 'Apple Podcasts', category: 'Video & Audio', placeholder: 'podcasts.apple.com/podcast/yourid' },
  { id: 'bandcamp', label: 'Bandcamp', category: 'Video & Audio', placeholder: 'yourname.bandcamp.com' },

  // Social Media
  { id: 'x', label: 'X (Twitter)', category: 'Social Media', placeholder: 'x.com/yourhandle' },
  { id: 'instagram', label: 'Instagram', category: 'Social Media', placeholder: 'instagram.com/yourname' },
  { id: 'facebook', label: 'Facebook', category: 'Social Media', placeholder: 'facebook.com/yourname' },
  { id: 'threads', label: 'Threads', category: 'Social Media', placeholder: 'threads.net/@yourname' },
  { id: 'bluesky', label: 'Bluesky', category: 'Social Media', placeholder: 'bsky.app/profile/yourname' },
  { id: 'mastodon', label: 'Mastodon', category: 'Social Media', placeholder: 'mastodon.social/@yourname' },
  { id: 'reddit', label: 'Reddit', category: 'Social Media', placeholder: 'reddit.com/u/yourname' },
  { id: 'pinterest', label: 'Pinterest', category: 'Social Media', placeholder: 'pinterest.com/yourname' },
  { id: 'snapchat', label: 'Snapchat', category: 'Social Media', placeholder: 'snapchat.com/add/yourname' },
  { id: 'producthunt', label: 'Product Hunt', category: 'Social Media', placeholder: 'producthunt.com/@yourname' },

  // Messaging
  { id: 'telegram', label: 'Telegram', category: 'Messaging', placeholder: 't.me/yourname' },
  { id: 'whatsapp', label: 'WhatsApp', category: 'Messaging', placeholder: 'wa.me/2348012345678' },
  { id: 'discord', label: 'Discord', category: 'Messaging', placeholder: 'discord.com/users/yourid' },
  { id: 'skype', label: 'Skype', category: 'Messaging', placeholder: 'skype:yourname?chat' },
  { id: 'signal', label: 'Signal', category: 'Messaging', placeholder: 'signal.me/#p/+234...' },
  { id: 'slack', label: 'Slack', category: 'Messaging', placeholder: 'yourworkspace.slack.com' },
  { id: 'zoom', label: 'Zoom', category: 'Messaging', placeholder: 'zoom.us/j/yourmeetingid' },

  // Learning & Credentials
  { id: 'coursera', label: 'Coursera', category: 'Learning & Credentials', placeholder: 'coursera.org/user/yourname' },
  { id: 'udemy', label: 'Udemy', category: 'Learning & Credentials', placeholder: 'udemy.com/user/yourname' },
  { id: 'udacity', label: 'Udacity', category: 'Learning & Credentials', placeholder: 'udacity.com/me' },
  { id: 'pluralsight', label: 'Pluralsight', category: 'Learning & Credentials', placeholder: 'pluralsight.com/authors/yourname' },
  { id: 'credly', label: 'Credly', category: 'Learning & Credentials', placeholder: 'credly.com/users/yourname' },
  { id: 'codecademy', label: 'Codecademy', category: 'Learning & Credentials', placeholder: 'codecademy.com/profiles/yourname' },
  { id: 'qwiklabs', label: 'Qwiklabs', category: 'Learning & Credentials', placeholder: 'qwiklabs.com/public_profiles/yourname' },
  { id: 'khan', label: 'Khan Academy', category: 'Learning & Credentials', placeholder: 'khanacademy.org/profile/yourname' },

  // Gaming & Other
  { id: 'steam', label: 'Steam', category: 'Gaming & Other', placeholder: 'steamcommunity.com/id/yourname' },
  { id: 'itchio', label: 'itch.io', category: 'Gaming & Other', placeholder: 'yourname.itch.io' },
  { id: 'opensea', label: 'OpenSea', category: 'Gaming & Other', placeholder: 'opensea.io/yourname' },
  { id: 'letterboxd', label: 'Letterboxd', category: 'Gaming & Other', placeholder: 'letterboxd.com/yourname' },
  { id: 'etsy', label: 'Etsy', category: 'Gaming & Other', placeholder: 'etsy.com/shop/yourshop' },
  { id: 'paypal', label: 'PayPal', category: 'Gaming & Other', placeholder: 'paypal.me/yourname' },
]

export const CATEGORIES = [...new Set(PLATFORMS.map(p => p.category))]
