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

export type Credentials = {
  id: Scalars['String'];
  password: Scalars['String'];
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
  status: IngredientRequestStatus;
  createdAt: Scalars['ZonedDateTime'];
  ingredients: Array<Ingredient>;
};

export enum IngredientRequestStatus {
  Received = 'Received',
  Transfer = 'Transfer',
  Open = 'Open'
}

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
  signup: User;
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  createUser: User;
  updateUser?: Maybe<User>;
  updateUserSelf: User;
  deactivateUser: Scalars['Boolean'];
  createOrder: Scalars['Int'];
  createRecipe: Recipe;
  requestIngredient: Scalars['Int'];
  transferIngredients: Scalars['Boolean'];
  receiveIngredients: Scalars['Boolean'];
  makeReport: Scalars['Int'];
  transferProducts: Scalars['Boolean'];
  receiveProducts: Scalars['Boolean'];
};


/** Schema Mutations */
export type MutationSignupArgs = {
  user: UserSignup;
};


/** Schema Mutations */
export type MutationLoginArgs = {
  credentials: Credentials;
};


/** Schema Mutations */
export type MutationCreateUserArgs = {
  user: UserEdit;
};


/** Schema Mutations */
export type MutationUpdateUserArgs = {
  user: UserEdit;
};


/** Schema Mutations */
export type MutationUpdateUserSelfArgs = {
  user: UserChange;
};


/** Schema Mutations */
export type MutationDeactivateUserArgs = {
  userId: Scalars['String'];
};


/** Schema Mutations */
export type MutationCreateOrderArgs = {
  order: OrderArg;
};


/** Schema Mutations */
export type MutationCreateRecipeArgs = {
  recipe: RecipeArg;
};


/** Schema Mutations */
export type MutationRequestIngredientArgs = {
  request: RequestArg;
};


/** Schema Mutations */
export type MutationTransferIngredientsArgs = {
  requestId: Scalars['Int'];
};


/** Schema Mutations */
export type MutationReceiveIngredientsArgs = {
  requestId: Scalars['Int'];
};


/** Schema Mutations */
export type MutationMakeReportArgs = {
  products: Array<Scalars['Int']>;
};


/** Schema Mutations */
export type MutationTransferProductsArgs = {
  productTransferId: Scalars['Int'];
};


/** Schema Mutations */
export type MutationReceiveProductsArgs = {
  productTransferId: Scalars['Int'];
};

export type Order = IdentifiableWithInt & {
   __typename?: 'Order';
  id: Scalars['Int'];
  count: Scalars['Int'];
  orderedBy: Scalars['String'];
  createdAt: Scalars['ZonedDateTime'];
  product: Product;
};

export type OrderArg = {
  product: Scalars['Int'];
  count: Scalars['Int'];
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
  createdAt: Scalars['ZonedDateTime'];
  products: Array<Product>;
};

export enum ProductTransferStatus {
  Stored = 'Stored',
  Transfer = 'Transfer',
  Produced = 'Produced'
}

/** Schema Queries */
export type Query = {
   __typename?: 'Query';
  loggedIn: Scalars['Boolean'];
  currentUser?: Maybe<User>;
  user?: Maybe<User>;
  allUsers: Array<User>;
  ingredient: Ingredient;
  allIngredients: Array<Ingredient>;
  searchKnowledge: Array<Knowledge>;
  getKnowledge: Knowledge;
  order: Order;
  orders: Array<Order>;
  product: Product;
  allProducts: Array<Product>;
  recipe: Recipe;
  allRecipes: Array<Recipe>;
  request: IngredientRequest;
  allRequests: Array<IngredientRequest>;
  report: ProductTransfer;
  allReports: Array<ProductTransfer>;
};


/** Schema Queries */
export type QueryUserArgs = {
  id: Scalars['String'];
};


/** Schema Queries */
export type QueryIngredientArgs = {
  id: Scalars['Int'];
};


/** Schema Queries */
export type QuerySearchKnowledgeArgs = {
  string: Scalars['String'];
  limit: Scalars['Int'];
  lookaround: Scalars['Int'];
};


/** Schema Queries */
export type QueryGetKnowledgeArgs = {
  id: Scalars['Int'];
};


/** Schema Queries */
export type QueryOrderArgs = {
  id: Scalars['Int'];
};


/** Schema Queries */
export type QueryProductArgs = {
  id: Scalars['Int'];
};


/** Schema Queries */
export type QueryRecipeArgs = {
  id: Scalars['Int'];
};


/** Schema Queries */
export type QueryRequestArgs = {
  id: Scalars['Int'];
};


/** Schema Queries */
export type QueryReportArgs = {
  id: Scalars['Int'];
};

export type Recipe = IdentifiableWithInt & {
   __typename?: 'Recipe';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  ingredients: Array<Ingredient>;
};

export type RecipeArg = {
  name: Scalars['String'];
  description: Scalars['String'];
  ingredients: Array<Scalars['Int']>;
};

export type RequestArg = {
  ingredients: Array<Scalars['Int']>;
};

/** User account and info */
export type User = IdentifiableWithString & {
   __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  role: UserRole;
  status: UserStatus;
};

export type UserChange = {
  password?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
};

/** User Edit Argument */
export type UserEdit = {
  id: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  role: UserRole;
};

export enum UserRole {
  WarehouseWorker = 'WarehouseWorker',
  WarehouseManager = 'WarehouseManager',
  WorkshopWorker = 'WorkshopWorker',
  WorkshopManager = 'WorkshopManager',
  Fairy = 'Fairy',
  Client = 'Client',
  Admin = 'Admin'
}

/** User Signup Argument */
export type UserSignup = {
  id: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
};

export enum UserStatus {
  Deactivated = 'Deactivated',
  Active = 'Active',
  Verification = 'Verification'
}


