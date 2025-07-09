// Simplified Property schema for debugging
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
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required().min(1)
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
              { title: 'MAD', value: 'MAD' },
              { title: 'EUR', value: 'EUR' },
              { title: 'USD', value: 'USD' }
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
          validation: (Rule: any) => Rule.required().min(1).max(10)
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
          validation: (Rule: any) => Rule.min(1)
        }
      ],
      validation: (Rule: any) => Rule.required()
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
          { title: 'Villa', value: 'villa' },
          { title: 'Apartment', value: 'apartment' },
          { title: 'Riad', value: 'riad' },
          { title: 'Hotel', value: 'hotel' },
          { title: 'Resort', value: 'resort' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location.city',
      media: 'images.0'
    }
  }
}
