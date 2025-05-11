import {Building, Desk, FloorImage} from '../../app/user/pages/office-space-booking/model/OfficeSpaceBookingTypes';


export const mockFloorDesks: Desk[] = [
  {id: 0, point: {x: 130, y: 130}, isAvailable: true},
  {id: 1, point: {x: 100, y: 100}, isAvailable: true},
  {id: 2, point: {x: 200, y: 200}, isAvailable: false},
  {id: 0, point: {x: 330, y: 530}, isAvailable: true},
  {id: 1, point: {x: 200, y: 300}, isAvailable: true},
  {id: 2, point: {x: 290, y: 130}, isAvailable: false},
]
export const mockFloorImages: FloorImage[] = [
  [
    {
      id: 0,
      floorNumber: 0,
      image: {
        id: '0',
        file: {} as File,
        url: 'assets/test-data/office-layout-photo-1.png'
      }
    },
    {
      id: 1,
      floorNumber: 1,
      image: {
        id: '1',
        file: {} as File,
        url: 'assets/test-data/office-layout-photo-2.png'
      }
    },
  ],
  [
    {
      id: 0,
      floorNumber: 0,
      image: {
        id: '0',
        file: {} as File,
        url: 'assets/test-data/office-layout-photo-3.png'
      }
    } as FloorImage,
    {
      id: 1,
      floorNumber: 1,
      image: {
        id: '1',
        file: {} as File,
        url: 'assets/test-data/office-layout-photo-1.png'
      }
    },
    {
      id: 2,
      floorNumber: 2,
      image: {
        id: '1',
        file: {} as File,
        url: 'assets/test-data/office-layout-photo-2.png'
      },
    }
  ],
][Math.floor(Math.random() * 2)];

export const mockBuildings: Building[] =
    [
      {id: 0, name: 'Building 0'},
      {id: 1, name: 'Building 1'},
      {id: 2, name: 'Building 2'},
      {id: 3, name: 'Building 3'},
      {id: 4, name: 'Building 4'}];