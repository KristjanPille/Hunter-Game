using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contracts.DAL.App.Repositories;
using DAL.App.DTO;
using DAL.App.EF.Mappers;
using ee.itcollege.carwash.kristjan.DAL.Base.EF.Repositories;

using Microsoft.EntityFrameworkCore;

namespace DAL.App.EF.Repositories
{
    public class HeroRepository :
        EFBaseRepository<AppDbContext, Domain.App.Identity.AppUser, Domain.App.Hero, DAL.App.DTO.Hero>,
        IHeroRepository
    {
        public HeroRepository(AppDbContext repoDbContext) : base(repoDbContext,
            new DALMapper<Domain.App.Hero, DTO.Hero>())
        {
        }
        
    }
}