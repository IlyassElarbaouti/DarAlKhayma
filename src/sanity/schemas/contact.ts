import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'inquiryType',
      title: 'Inquiry Type',
      type: 'string',
      options: {
        list: [
          { title: 'General Inquiry', value: 'general' },
          { title: 'Booking Support', value: 'booking' },
          { title: 'Property Application', value: 'property-application' },
          { title: 'Press & Media', value: 'media' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    // Property application specific fields
    defineField({
      name: 'propertyDetails',
      title: 'Property Details',
      type: 'object',
      hidden: ({ document }) => document?.inquiryType !== 'property-application',
      fields: [
        {
          name: 'propertyName',
          title: 'Property Name',
          type: 'string',
        },
        {
          name: 'propertyType',
          title: 'Property Type',
          type: 'string',
          options: {
            list: [
              { title: 'Riad', value: 'riad' },
              { title: 'Villa', value: 'villa' },
              { title: 'Apartment', value: 'apartment' },
              { title: 'House', value: 'house' },
              { title: 'Resort', value: 'resort' },
              { title: 'Hotel', value: 'hotel' },
            ],
          },
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
        },
        {
          name: 'bedrooms',
          title: 'Number of Bedrooms',
          type: 'number',
        },
        {
          name: 'guests',
          title: 'Maximum Guests',
          type: 'number',
        },
        {
          name: 'priceRange',
          title: 'Price Range (MAD/night)',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Property Description',
          type: 'text',
        },
        {
          name: 'features',
          title: 'Special Features',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'images',
          title: 'Property Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
        {
          name: 'contactPerson',
          title: 'Contact Person',
          type: 'string',
        },
        {
          name: 'contactPhone',
          title: 'Contact Phone',
          type: 'string',
        },
        {
          name: 'preferredCommission',
          title: 'Preferred Commission (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(50),
        },
      ],
    }),
    // Metadata
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Resolved', value: 'resolved' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
          { title: 'Urgent', value: 'urgent' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes for team members',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Website Contact Form', value: 'website' },
          { title: 'Email', value: 'email' },
          { title: 'Phone Call', value: 'phone' },
          { title: 'Social Media', value: 'social' },
          { title: 'Referral', value: 'referral' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'website',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      inquiry: 'inquiryType',
      status: 'status',
    },
    prepare({ title, subtitle, inquiry, status }) {
      return {
        title: `${title} - ${inquiry}`,
        subtitle: `${subtitle} (${status})`,
      }
    },
  },
  orderings: [
    {
      title: 'Submitted Date, New',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
    {
      title: 'Priority',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }],
    },
  ],
})
