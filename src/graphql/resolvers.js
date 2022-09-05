const resolvers = {
  Query: {
    getMerchant: async (_, obj, context) => {
      try {
        const result = await context.knex
          .from('merchant')
          .select('id', 'merchant_name', 'phone_number', 'latitude', 'longitude', 'is_active', 'recorded_date')
          .where({ id: obj.id });
        return result[0] ?? {};
      } catch (err) {
        context.fastify.log.error(err);
        throw Error('Error in getMerchant gql');
      }
    },
    getMerchantList: async (_, obj, context) => {
      try {
        const field = obj.sort.field;
        const order = obj.sort.order;

        const result = await context.knex
          .from('merchant')
          .select('id', 'merchant_name', 'phone_number', 'latitude', 'longitude', 'is_active', 'recorded_date')
          .limit(obj.limit).offset(obj.offset)
          .orderBy(field, order) ;
        return result;
      } catch (err) {
        context.fastify.log.error(err);
        throw Error('Error in getMerchantList');
      }
    },
  },
  Mutation: {
    addMerchant: async (_, obj, context) => {
      try {

        const result = await context.knex.from('merchant')
          .returning(
            ['id','merchant_name','phone_number','latitude', 'is_active', 'recorded_date']
          )
          .insert({
          merchant_name: obj.input.merchant_name,
          phone_number: obj.input.phone_number,
          latitude: obj.input.latitude,
          longitude: obj.input.longitude,
        });
        return result[0] ?? null;
      } catch (err) {
        context.fastify.log.error(err);
        throw Error('Error in addMerchant gql');
      }
    },
    updateMerchant: async (_, obj, context) => {
      try {

        const result = await context.knex.from('merchant')
        .returning(
          ['id','merchant_name','phone_number','latitude', 'is_active', 'recorded_date']
        )
        .update({
          merchant_name: obj.input.merchant_name,
          phone_number: obj.input.phone_number,
          latitude: obj.input.latitude,
          longitude: obj.input.longitude,
        }).where({ id: obj.id });
        return result[0] ?? null;
      } catch (err) {
        context.fastify.log.error(err);
        throw Error('Error in updateMerchant gql');
      }
    },
    updateBulkIsActive: async (_, obj, context) => {
      try {

        const array = [...obj.id];
        const result = await context.knex.from('merchant')
        .returning(
          ['id','merchant_name','phone_number','latitude', 'is_active', 'recorded_date']
        )
        .update({
          is_active: obj.is_active
        }).whereIn('id', obj.id);
        return result ?? null;
      } catch (err) {
        context.fastify.log.error(err);
        throw Error('Error in updateBulkIsActive gql');
      }
    },
  },
};

module.exports = resolvers;
