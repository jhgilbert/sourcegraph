package graphqlbackend

import (
	"context"

	"github.com/graph-gophers/graphql-go"

	"github.com/sourcegraph/sourcegraph/cmd/frontend/graphqlbackend/graphqlutil"
	"github.com/sourcegraph/sourcegraph/internal/gqlutil"
)

type RoleResolver interface {
	ID() graphql.ID
	Name() string
	System() bool
	CreatedAt() gqlutil.DateTime
	Permissions(context.Context, *ListPermissionArgs) (*graphqlutil.ConnectionResolver[PermissionResolver], error)
}

type PermissionResolver interface {
	ID() graphql.ID
	Namespace() string
	Action() string
	CreatedAt() gqlutil.DateTime
}

type RBACResolver interface {
	// MUTATIONS

	// QUERIES
	Roles(ctx context.Context, args *ListRoleArgs) (*graphqlutil.ConnectionResolver[RoleResolver], error)
	Permissions(ctx context.Context, args *ListPermissionArgs) (*graphqlutil.ConnectionResolver[PermissionResolver], error)

	NodeResolvers() map[string]NodeByIDFunc
}

type ListRoleArgs struct {
	graphqlutil.ConnectionResolverArgs

	System bool
	User   *graphql.ID
}

type ListPermissionArgs struct {
	graphqlutil.ConnectionResolverArgs

	Role *graphql.ID
	User *graphql.ID
}