import {
   CollectionConstants,
   PermissionConstants,
   RoleConstants,
   SectionConstants,
} from '../constants'
import { StatusConstants } from '../constants/status'

const CollectionConstantsEnum = Object.values(CollectionConstants)
export type CollectionConstantsType = (typeof CollectionConstantsEnum)[number]

const RoleConstantsEnum = Object.values(RoleConstants)
export type RoleConstantsType = (typeof RoleConstantsEnum)[number]

const SectionConstantsEnum = Object.values(SectionConstants)
export type SectionConstantsType = (typeof SectionConstantsEnum)[number]

const PermissionEnum = Object.values(PermissionConstants)
export type PermissionConstantsType = (typeof PermissionEnum)[number]

const StatusConstantsEnum = Object.values(StatusConstants)
export type StatusConstantsType = (typeof StatusConstantsEnum)[number]
