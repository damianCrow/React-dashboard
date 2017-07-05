export const initialState = {
  playlist: [
		{
      id: '001',
      type: 'Image',
      title: 'Item 1',
      url: '',
      serviceId: '',
    },
    {
      id: '002',
      type: 'Image',
      title: 'Item 2',
      url: '',
      serviceId: '',
    },
    {
      id: '003',
      type: 'Video',
      title: 'Item 3',
      url: '',
      serviceId: '',
    },
    {
      id: '004',
      type: 'Image',
      title: 'Item 4',
      url: '',
      serviceId: '',
    },
    {
      id: '005',
      type: 'Video',
      title: 'Item 5',
      url: '',
      serviceId: '',
    },
    {
      id: '006',
      type: 'Video',
      title: 'Item 6',
      url: '',
      serviceId: '',
    },
  ],
  saved: true,
  status: '',
}

export const getSaveState = (state = initialState) => state.saved || initialState.saved
