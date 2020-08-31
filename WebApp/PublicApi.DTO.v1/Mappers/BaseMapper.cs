using AutoMapper;

namespace PublicApi.DTO.v1.Mappers
{
    public abstract class BaseMapper<TLeftObject, TRightObject> : ee.itcollege.carwash.kristjan.DAL.Base.Mappers.BaseMapper<TLeftObject, TRightObject>
        where TRightObject : class?, new()
        where TLeftObject : class?, new()
    {
    }
}