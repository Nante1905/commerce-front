import { Direction } from "./direction.type";

export interface User {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  dateEmbauche: string;
  email: string;
  direction: Direction;
  authorities: string[];
}

export interface UserCredentials {
  email: string;
  password: string;
}
