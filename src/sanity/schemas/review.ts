import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Reviews & Testimonials',
  type: 'document',
  icon: () => '⭐',
  fields: [
    defineField({
      name: 'name',
      title: 'Guest Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'location',
      title: 'Guest Location',
      type: 'string',
      description: 'e.g. "Paris, France"',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'avatar',
      title: 'Guest Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      initialValue: 5
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().min(50).max(500)
    }),
    defineField({
      name: 'property',
      title: 'Property Stayed At',
      type: 'string',
      description: 'Name of the property they stayed at',
      validation: Rule => Rule.required()
    }),
    // Corporate-specific fields
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      description: 'Name of the company (for corporate reviews)',
      hidden: ({ document }) => document?.reviewType !== 'corporate'
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title/Role',
      type: 'string',
      description: 'Professional title of the reviewer',
      hidden: ({ document }) => document?.reviewType !== 'corporate'
    }),
    // Property owner specific fields
    defineField({
      name: 'propertyOwned',
      title: 'Property Owned',
      type: 'string',
      description: 'Name of the property they own',
      hidden: ({ document }) => document?.reviewType !== 'property-owner'
    }),
    defineField({
      name: 'ownershipDuration',
      title: 'Partnership Duration',
      type: 'string',
      description: 'How long they\'ve been working with us',
      hidden: ({ document }) => document?.reviewType !== 'property-owner'
    }),
    defineField({
      name: 'reviewType',
      title: 'Review Type',
      type: 'string',
      options: {
        list: [
          { title: 'Guest Review', value: 'guest' },
          { title: 'Corporate Review', value: 'corporate' },
          { title: 'Property Owner Review', value: 'property-owner' }
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'guest'
    }),
    defineField({
      name: 'source',
      title: 'Review Source',
      type: 'string',
      options: {
        list: [
          { title: 'Airbnb Guest', value: 'Airbnb Guest' },
          { title: 'Booking.com Guest', value: 'Booking.com Guest' },
          { title: 'Direct Booking', value: 'Direct Booking' },
          { title: 'Google Reviews', value: 'Google Reviews' },
          { title: 'Corporate Client', value: 'Corporate Client' },
          { title: 'Property Owner', value: 'Property Owner' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Featured Review',
      type: 'boolean',
      description: 'Show this review prominently on the homepage',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0
    }),
    defineField({
      name: 'verified',
      title: 'Verified Review',
      type: 'boolean',
      description: 'Mark as verified/authentic review',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'avatar',
      rating: 'rating'
    },
    prepare(selection) {
      const { title, subtitle, rating } = selection
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: `${title} ${stars}`,
        subtitle: subtitle,
        media: selection.media
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Rating (High to Low)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }]
    },
    {
      title: 'Newest First',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }]
    }
  ]
})
