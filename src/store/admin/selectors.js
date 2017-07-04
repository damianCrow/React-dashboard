export const initialState = {
  playlist: [
		{
      id: '',
      type: 'Image',
      title: 'Item 1',
      url: '',
      serviceId: '',
    },
    {
      id: '',
      type: 'Image',
      title: 'Item 2',
      url: '',
      serviceId: '',
    },
    {
      id: '',
      type: 'Video',
      title: 'Item 3',
      url: '',
      serviceId: '',
    },
    {
      id: '',
      type: 'Image',
      title: 'Item 4',
      url: '',
      serviceId: '',
    },
    {
      id: '',
      type: 'Video',
      title: 'Item 5',
      url: '',
      serviceId: '',
    },
    {
      id: '',
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
