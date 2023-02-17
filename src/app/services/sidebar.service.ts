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
          titulo: 'Mi Campaña',
          url: 'list-campanias-supervisor',
          roles: [{ name: 'Supervior' }],
        },
        {
          titulo: 'Test',
          url: '/as',
          roles: [{ name: 'Agente' }],
        },
        {
          titulo: 'Agentes',
          url: 'agents',
          roles: [{ name: 'Administrador' }, { name: 'Supervior' }],
        },
      ],
    },
  ];
  constructor() {}
}
