import { serviceType } from "./service_type"

export type Service = {
  provider: string
  requester:string
  serviceType: serviceType
  phone:string
  observation:string
}