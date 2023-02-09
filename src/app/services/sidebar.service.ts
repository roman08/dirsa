import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Grupos de agentes',
          url: 'listado-grupos',
          roles: [{ name: 'Administrador' }],
        },
        {
          titulo: 'Campañas',
          url: 'listado-campanias',
          roles: [{ name: 'Administrador' }],
        },
        {
          titulo: 'Test',
          url: '/as',
          roles: [{ name: 'Agente' }],
        },
      ],
    },
  ];
  constructor() {}
}
