const swaggerDefinitions = {
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the user',
            example: '5f8f9c7d6857596d12ff4487',
          },
          name: {
            type: 'string',
            description: 'Name of the user',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            description: 'Email of the user',
            example: 'john.doe@example.com',
          },
          points_balance: {
            type: 'integer',
            description: 'Balance points of the user',
            example: 100,
          },
          reward_points: {
            type: 'object',
            description: 'Reward points of the user',
            properties: {
              points: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    transaction_id: {
                      type: 'string',
                      description: 'Transaction identifier for the points',
                      example: '1234567890',
                    },
                    original_points: {
                      type: 'integer',
                      description: 'Original points from this transaction',
                      example: 200,
                    },
                    remaining_points: {
                      type: 'integer',
                      description: 'Remaining points after redemptions',
                      example: 150,
                    },
                    assignment_date: {
                      type: 'string',
                      description: 'Assignment date of the points',
                      example: '2023-06-28',
                    },
                    expiry_date: {
                      type: 'string',
                      description: 'Expiry date of the points',
                      example: '2024-06-28',
                    },
                    source_platform: {
                      type: 'string',
                      description: 'Source platform of the points',
                      example: 'website',
                    },
                    redemptions: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          redemption_id: {
                            type: 'string',
                            description: 'Redemption identifier for the points',
                            example: '0987654321',
                          },
                          redeemed_points: {
                            type: 'integer',
                            description: 'Redeemed points in this redemption',
                            example: 50,
                          },
                          redemption_date: {
                            type: 'string',
                            description: 'Redemption date of the points',
                            example: '2023-07-01',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

module.exports = {
  swaggerDefinitions,
}
