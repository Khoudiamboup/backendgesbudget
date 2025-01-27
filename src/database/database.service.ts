import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private connection: Connection) {}

  async testConnection() {
    try {
      await this.connection.query('SELECT 1');
      console.log('Connexion à la Base de donnée bien établie');
    } catch (error) {
      console.error('Erreur de connexion à la Base de donnée', error);
    }
  }
}
