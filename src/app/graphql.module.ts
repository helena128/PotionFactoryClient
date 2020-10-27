import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import {from} from "apollo-link";
import {ToastrService} from "ngx-toastr";

const uri = "/graphql"; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink, toastr: ToastrService) {
  const link =
    from(
      [
        onError((r) => {
          if (r.networkError) {
            var message;
            if (r.networkError['statusText']) {
              switch (r.networkError['statusText']) {
                case 'Unknown Error':
                  message = "Connection Error"; break
                default:
                  message = r.networkError['statusText']
              }
            }
            else {
              message = r.networkError.message
            }

            toastr.error("Network Error: " + message)
          }
        }),
        httpLink.create({
          uri: uri,
          withCredentials: true
        })
      ]
    )

  return {
    link,
    cache: new InMemoryCache(),
    credentials: 'include',
    defaultOptions: {
      query: {
        // fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      },
      watchQuery: {
        // fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      },
      mutate: {
        // fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      },
    }
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, ToastrService],
    },
  ],
})
export class GraphQLModule {}
