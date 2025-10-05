import { CollectionConstants } from "../constants"

const CollectionConstantsEnum = Object.values(CollectionConstants)
export type CollectionConstantsType = (typeof CollectionConstantsEnum)[number]
