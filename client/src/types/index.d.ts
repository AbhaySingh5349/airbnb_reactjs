export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface AccomodationData {
  title: string;
  address: string;
  description: string;
  has_wifi: boolean;
  has_tv: boolean;
  has_breakfast_included: boolean;
  has_terrace_club: boolean;
  has_pets_allowed: boolean;
  has_free_parking: boolean;
  extraInfo?: string;
  checkIn: Date;
  checkOut: Date;
  maxGuests: number;
  price: number;
}

export interface BookingData {
  checkIn: Date;
  checkOut: Date;
  guestCount: number;
  name: string;
  phone: number;
}

export interface PerksProps {
  selected: any;
  onChange: any;
}
