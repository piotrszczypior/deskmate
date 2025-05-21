import {Building, Desk, FloorImage} from '../../app/user/pages/office-space-booking/model/OfficeSpaceBookingTypes';
import {Booking} from '../../app/user/pages/my-bookings/model/BookingTypes';


export const mockFloorDesks:  Desk[] =
  [
    {id: 0, point: {x: 130, y: 130}, isAvailable: true},
    {id: 1, point: {x: 100, y: 100}, isAvailable: true},
    {id: 2, point: {x: 200, y: 200}, isAvailable: false},
    {id: 3, point: {x: 330, y: 530}, isAvailable: true},
    {id: 4, point: {x: 200, y: 300}, isAvailable: true},
    {id: 5, point: {x: 290, y: 130}, isAvailable: false},
    {id: 6, point: {x: 190, y: 190}, isAvailable: true},
    {id: 7, point: {x: 110, y: 190}, isAvailable: true},
    {id: 8, point: {x: 210, y: 290}, isAvailable: false},
    {id: 9, point: {x: 310, y: 590}, isAvailable: true},
    {id: 10, point: {x: 210, y: 390}, isAvailable: true},
    {id: 11, point: {x: 210, y: 190}, isAvailable: false},
  ];

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
    },
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

export const mockBookings: Booking[] =
    [
      {
        id: 0,
        floorImageId: 0,
        floorNumber: 3,
        building: mockBuildings[0],
        deskId: 0,
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 60 * 60 * 1000)
      },
      {
        id: 1,
        floorImageId: 1,
        floorNumber: 5,
        building: mockBuildings[1],
        deskId: 1,
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 60 * 60 * 1000)
      },
      {
        id: 2,
        floorImageId: 1,
        floorNumber: 11,
        building: mockBuildings[1],
        deskId: 1,
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 60 * 60 * 1000)
      },
    ]
