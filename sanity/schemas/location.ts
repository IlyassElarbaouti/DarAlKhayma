// Location schema for Sanity
export default {
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    {
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'Morocco',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(-90).max(90)
        },
        {
          name: 'lng',
          title: 'Longitude',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(-180).max(180)
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }
  ],
  preview: {
    select: {
      title: 'city',
      subtitle: 'region'
    }
  }
}
