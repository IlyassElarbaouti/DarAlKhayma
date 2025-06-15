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
    }),    defineField({
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
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Traditional Riad', value: 'riad' },
          { title: 'Villa', value: 'villa' },
          { title: 'Apartment', value: 'apartment' },
          { title: 'House', value: 'house' },
          { title: 'Other', value: 'other' },        ],
      },
      hidden: ({ document }) => document?.inquiryType !== 'property-application',
    }),
    defineField({
      name: 'location',
      title: 'Property Location',
      type: 'string',
      hidden: ({ document }) => document?.inquiryType !== 'property-application',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Number of Bedrooms',
      type: 'string',
      options: {
        list: [
          { title: '1 Bedroom', value: '1' },
          { title: '2 Bedrooms', value: '2' },
          { title: '3 Bedrooms', value: '3' },
          { title: '4 Bedrooms', value: '4' },
          { title: '5 Bedrooms', value: '5' },
          { title: '6+ Bedrooms', value: '6+' },
        ],
      },
      hidden: ({ document }) => document?.inquiryType !== 'property-application',
    }),
    defineField({
      name: 'propertyDescription',
      title: 'Property Description',
      type: 'text',
      hidden: ({ document }) => document?.inquiryType !== 'property-application',
    }),
    defineField({
      name: 'propertySize',
      title: 'Property Size (sqm)',
      type: 'string',
      hidden: ({ document }) => document?.inquiryType !== 'property-application',
    }),
    defineField({
      name: 'amenities',
      title: 'Available Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ document }) => document?.inquiryType !== 'property-application',
    }),
    defineField({
      name: 'currentlyRenting',
      title: 'Currently Renting',
      type: 'string',
      options: {
        list: [
          { title: 'Yes, currently listing', value: 'yes' },
          { title: 'No, new to rental', value: 'no' },
          { title: 'Considering starting', value: 'considering' },
        ],
      },      hidden: ({ document }) => document?.inquiryType !== 'property-application',
    }),
    defineField({
      name: 'expectedRevenue',
      title: 'Expected Monthly Revenue',
      type: 'string',
      hidden: ({ document }) => document?.inquiryType !== 'property-application',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Responded', value: 'responded' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes for tracking communication',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'inquiryType',
    },    prepare(selection) {
      const { title, subtitle, media } = selection;      const inquiryTypeLabels: Record<string, string> = {
        general: 'General Inquiry',
        booking: 'Booking Support',
        'property-application': 'Property Application',
        media: 'Press & Media',
      };
      const inquiryTypeLabel = inquiryTypeLabels[media] || media;
      
      return {
        title: title || 'Unknown',
        subtitle: `${subtitle} • ${inquiryTypeLabel}`,
      };
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'oldestFirst', 
      by: [{ field: 'submittedAt', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
})
