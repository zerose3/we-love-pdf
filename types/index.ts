export interface Tool {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar: string
}

export interface PricingPlan {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
}