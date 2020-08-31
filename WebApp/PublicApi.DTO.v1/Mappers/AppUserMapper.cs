using AutoMapper;
using PublicApi.DTO.v1.Identity;

namespace PublicApi.DTO.v1.Mappers
{
    public class AppUserMapper : BaseMapper<Domain.App.Identity.AppUser, AppUser>
    {
        public Domain.App.Identity.AppUser MapAppUserToDomain(PublicApi.DTO.v1.Identity.AppUser inObject)
        {
            return Mapper.Map<Domain.App.Identity.AppUser>(inObject);
        }
    }
    
}