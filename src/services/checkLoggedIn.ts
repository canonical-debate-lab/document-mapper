import gql from 'graphql-tag'

export default apolloClient => (
  apolloClient.query({
    query: gql`
      query getUser {
        user {
          id
          name
        }
      }
    `
  }).then(({ data }) => {
    // TODO CHECK RETURN
    return { loggedInUser: { user: data.user } }
  }).catch(() => {
    // Fail gracefully
    return { loggedInUser: {} }
  })
)
