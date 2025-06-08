// Destination schema for Sanity
export default {
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: (Rule: any) => Rule.max(150)
    },
    {
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
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
      ]
    },
    {
      name: 'featured',
      title: 'Featured Destination',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key highlights of this destination'
    },
    {
      name: 'attractions',
      title: 'Attractions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  'Historical Site',
                  'Museum',
                  'Park',
                  'Market',
                  'Religious Site',
                  'Cultural Site',
                  'Natural Landmark',
                  'Entertainment'
                ]
              }
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2
            }
          ]
        }
      ]
    },
    {
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Popular activities in this destination'
    },
    {
      name: 'transportation',
      title: 'Transportation',
      type: 'object',
      fields: [
        {
          name: 'airport',
          title: 'Airport Information',
          type: 'string'
        },
        {
          name: 'trainStation',
          title: 'Train Station Information',
          type: 'string'
        },
        {
          name: 'carRental',
          title: 'Car Rental Information',
          type: 'string'
        }
      ]
    },
    {
      name: 'weather',
      title: 'Weather Information',
      type: 'object',
      fields: [
        {
          name: 'bestTimeToVisit',
          title: 'Best Time to Visit',
          type: 'string'
        },
        {
          name: 'averageTemp',
          title: 'Average Temperature',
          type: 'string'
        },
        {
          name: 'rainyMonths',
          title: 'Rainy Months',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'region',
      media: 'image'
    }
  }
}
