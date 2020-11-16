﻿using System;
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
    public class HunterBaseRepository :
        EFBaseRepository<AppDbContext, Domain.App.Identity.AppUser, Domain.App.HunterBase, DAL.App.DTO.HunterBase>,
        IHunterBaseRepository
    {
        public HunterBaseRepository(AppDbContext repoDbContext) : base(repoDbContext,
            new DALMapper<Domain.App.HunterBase, DTO.HunterBase>())
        {
        }
        
        public override async Task<HunterBase> FirstOrDefaultAsync(Guid hunterBaseId, object? userId, bool noTracking)
        {
            var hunterBase = await RepoDbSet.AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == hunterBaseId);

            hunterBase.Buildings = await RepoDbContext.Buildings.AsNoTracking()
                .Where(l => l.HunterBaseId == hunterBaseId)
                .ToListAsync();
            
            hunterBase.Heroes = await RepoDbContext.Heroes.AsNoTracking()
                .Where(l => l.HunterBaseId == hunterBaseId)
                .ToListAsync();
            
            return Mapper.Map(hunterBase);
        }

    }
}