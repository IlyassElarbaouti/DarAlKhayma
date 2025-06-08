// Property schema for Sanity
export default {
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(10).max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required().min(50).max(500)
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: (Rule: any) => Rule.max(150)
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'asset',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required().min(1).max(10)
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Amount',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(0)
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              { title: 'Moroccan Dirham (MAD)', value: 'MAD' },
              { title: 'Euro (EUR)', value: 'EUR' },
              { title: 'US Dollar (USD)', value: 'USD' }
            ]
          },
          initialValue: 'MAD',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'period',
          title: 'Period',
          type: 'string',
          options: {
            list: [
              { title: 'Per Night', value: 'night' },
              { title: 'Per Week', value: 'week' },
              { title: 'Per Month', value: 'month' }
            ]
          },
          initialValue: 'night',
          validation: (Rule: any) => Rule.required()
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        {
          name: 'bedrooms',
          title: 'Bedrooms',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(0).max(20)
        },
        {
          name: 'bathrooms',
          title: 'Bathrooms',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(0).max(20)
        },
        {
          name: 'guests',
          title: 'Max Guests',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(1).max(50)
        },
        {
          name: 'area',
          title: 'Area (m²)',
          type: 'number',
          validation: (Rule: any) => Rule.min(10)
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'amenity' }] }]
    },
    {
      name: 'bookingLinks',
      title: 'Booking Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Airbnb', value: 'airbnb' },
                  { title: 'Booking.com', value: 'booking' },
                  { title: 'VRBO', value: 'vrbo' },
                  { title: 'Direct Booking', value: 'direct' }
                ]
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            }
          ]
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Riad', value: 'riad' },
          { title: 'Villa', value: 'villa' },
          { title: 'Apartment', value: 'apartment' },
          { title: 'House', value: 'house' },
          { title: 'Resort', value: 'resort' },
          { title: 'Hotel', value: 'hotel' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'object',
      fields: [
        {
          name: 'available',
          title: 'Available',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'nextAvailable',
          title: 'Next Available Date',
          type: 'date'
        }
      ]
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'object',
      fields: [
        {
          name: 'average',
          title: 'Average Rating',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(5)
        },
        {
          name: 'count',
          title: 'Number of Reviews',
          type: 'number',
          validation: (Rule: any) => Rule.min(0)
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location.city',
      media: 'images.0.asset'
    }
  }
}
