# Feeds - an open-sourced App Store for algorithmic choice

![Image](https://github.com/shomilj/feeds-react-native/blob/master/docs/screens.jpg?raw=true)

Contributors: [Niky Arora](https://www.linkedin.com/in/nikhararora/) & [Shomil Jain](https://www.linkedin.com/in/shomiljain/)
Video Demo: https://www.youtube.com/embed/kAC-ixuRSv4
Backend Project: https://github.com/shomilj/feeds-backend

## Inspiration
This past year, we've seen the effects of uncontrolled algorithmic amplification on society. From widespread [riot-inciting misinformation on Facebook](https://www.theverge.com/2020/3/17/21183341/facebook-misinformation-report-nathalie-marechal) to the explosive growth of TikTok - a platform that serves content [entirely on a black-box algorithm](https://www.wired.com/story/tiktok-finally-explains-for-you-algorithm-works/), we've reached a point where [social media algorithms rule how we see the world](https://www.wsj.com/articles/social-media-algorithms-rule-how-we-see-the-world-good-luck-trying-to-stop-them-11610884800) - and it seems like we've lost our individual ability to control these incredibly intricate systems. 

From a consumer's perspective, it's difficult to tell what your social media feed prioritizes – sometimes, it shows you content related to products you might have searched the internet for; other times, you might see [eerily accurate friend recommendations](https://www.theverge.com/2017/9/7/16269074/facebook-tinder-messenger-suggestions). If you've watched [The Social Dilemma](https://www.thesocialdilemma.com), you might think that your Facebook feed is managed directly by Mark Zuckerberg & his three dials: engagement, growth, and revenue

The bottom line: we need significant innovation around the algorithms that power our digital lives.

## Feeds: an Open-Sourced App Store for Algorithmic Choice
On Feeds, you're in control over what information is prioritized. You're no longer bound to a hyper-personalized engine designed to maximize your engagement: instead, you have the ability to set your own utility function & design your own feed.

## How we built it
We built Feeds on a React Native frontend & serverless Google Cloud Functions backend! Our app pulls data live from Twitter using [Twint](https://pypi.org/project/twint/) (an open-source Twitter OSINT tool). To prototype our algorithms, we employed a variety of techniques to prioritize different emotions & content –
- "Positivity" - optimized for positive & optimistic content (powered by [OpenAI](http://openai.com))
- "Virality" - optimized for viral content (powered by Twint)
- "Controversy" - optimized for controversial content (powered by [Textblob/NLTK](https://textblob.readthedocs.io/en/dev/))
- "Verified" - optimized for high-quality & verified content
- "Learning" - optimized for educational content

Additionally, to add to the ability to break out of your own echo chamber, we added a feature that puts you into the social media feed of influencers – so if you want to see exactly what Elon Musk or Vice President Kamala Harris sees on Twitter, you can switch to those Feeds with just a tap!

## Challenges we ran into
Twitter's hardly a developer-friendly platform - scraping Tweets to use for our prototype was probably one of our most challenging tasks! We also ran into many algorithmic design choices (e.g. how to detect "controversy") - and drew inspiration from a variety of resource papers & open-source projects.

## Accomplishments that we're proud of
We built a functioning full-stack product over the course of ~10 hours - and we truly believe this emphasis on algorithmic choice is one critical component to the future of social media!

## What we learned
We learned a lot about natural language processing & the different challenges when it comes to designing algorithms using cutting-edge tools like GPT-3!

## What's next for Feeds
We'd love to turn this into an open-sourced platform that plugs into different content sources -- and allows anyone (any developer) to create a custom Feed & share it with the world!
