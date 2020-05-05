/*
 * THIS FILE WAS GENERATED WITH sbt reloadSchema.
 * Do not change it directly
 */

export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ZonedDateTime: any;
};

/** Entity that can be identified with Integer */
export type IdentifiableWithInt = {
  id: Scalars['Int'];
};

/** Entity that can be identified with String */
export type IdentifiableWithString = {
  id: Scalars['String'];
};

export type Ingredient = IdentifiableWithInt & {
   __typename?: 'Ingredient';
  id: Scalars['Int'];
  name: Scalars['String'];
  addedAt: Scalars['ZonedDateTime'];
  description: Scalars['String'];
  count: Scalars['Int'];
};

export type IngredientRequest = IdentifiableWithInt & {
   __typename?: 'IngredientRequest';
  id: Scalars['Int'];
  ingredients: Array<Ingredient>;
};

export type Knowledge = IdentifiableWithInt & {
   __typename?: 'Knowledge';
  id: Scalars['Int'];
  kind: KnowledgeKind;
  name: Scalars['String'];
  addedAt: Scalars['ZonedDateTime'];
  content: Scalars['String'];
};

export enum KnowledgeKind {
  Fable = 'Fable',
  Myth = 'Myth',
  Book = 'Book',
  Gossip = 'Gossip'
}

/** Schema Mutations */
export type Mutation = {
   __typename?: 'Mutation';
  createOrder: Scalars['Int'];
  requestIngredient: IngredientRequest;
  makeReport: ProductTransfer;
};


/** Schema Mutations */
export type MutationCreateOrderArgs = {
  order: OrderArg;
};


/** Schema Mutations */
export type MutationRequestIngredientArgs = {
  ingredients: Array<Scalars['Int']>;
};


/** Schema Mutations */
export type MutationMakeReportArgs = {
  products: Array<Scalars['Int']>;
};

export type OrderArg = {
  product: Scalars['Int'];
  count: Scalars['Int'];
  orderedBy: Scalars['String'];
};

export type Product = IdentifiableWithInt & {
   __typename?: 'Product';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  count: Scalars['Int'];
  basePrice: Scalars['Float'];
  tags: Array<Scalars['String']>;
  recipe: Recipe;
};

export type ProductTransfer = IdentifiableWithInt & {
   __typename?: 'ProductTransfer';
  id: Scalars['Int'];
  status: ProductTransferStatus;
  products: Array<Product>;
};

export enum ProductTransferStatus {
  Stored = 'Stored',
  Transferred = 'Transferred',
  Produced = 'Produced'
}

/** Schema Queries */
export type Query = {
   __typename?: 'Query';
  user?: Maybe<User>;
  searchKnowledge: Array<Knowledge>;
  ingredient: Ingredient;
  allIngredients: Array<Ingredient>;
  product: Product;
  allProducts: Array<Product>;
};


/** Schema Queries */
export type QueryUserArgs = {
  id: Scalars['String'];
};


/** Schema Queries */
export type QuerySearchKnowledgeArgs = {
  string: Scalars['String'];
  limit: Scalars['Int'];
  lookaround: Scalars['Int'];
};


/** Schema Queries */
export type QueryIngredientArgs = {
  id: Scalars['Int'];
};


/** Schema Queries */
export type QueryProductArgs = {
  id: Scalars['Int'];
};

export type Recipe = IdentifiableWithInt & {
   __typename?: 'Recipe';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  ingredients: Array<Ingredient>;
};

/** User account and info */
export type User = IdentifiableWithString & {
   __typename?: 'User';
  id: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  role: UserRole;
};

export enum UserRole {
  WarehouseManager = 'WarehouseManager',
  WorkshopManager = 'WorkshopManager',
  Client = 'Client',
  Fairy = 'Fairy',
  Admin = 'Admin'
}


