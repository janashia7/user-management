# User management: rating

**Business context:**
**Many application has karma (ex: Reddit). It means users can vote for other users or users content. Voting limited by time and count.**

**Task:**

1. Add endpoint for voting for users profiles. Only registered user can vote. Vote can positive (+1) and negative (-1). User can change or withdraw vote, but can not vote twice for the same profile. User can not vote for him self. User can vote one time per hour.
2. User profile should have rating as votes sum.
