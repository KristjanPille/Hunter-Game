using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contracts.BLL.App;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL.App.EF;
using Domain.App;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using PublicApi.DTO.v1.Mappers;
using V1DTO=PublicApi.DTO.v1;

namespace WebApp.ApiControllers._1._0
{
    /// <summary>
    /// Heroes Api Controller
    /// </summary>
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class HeroesController : ControllerBase
    {
        private readonly IAppBLL _bll;
        private readonly HeroMapper _mapper = new HeroMapper();

        public HeroesController(AppDbContext context, IAppBLL bll)
        {
            _bll = bll;
        }

        // GET: api/Heroes
        /// <summary>
        /// Get all Heroes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<PublicApi.DTO.v1.Hero>>> GetHeroes()
        {
            return Ok((await _bll.Heroes.GetAllAsync()).Select(e => _mapper.Map(e)));
        }

        // GET: api/Heroes/5
        /// <summary>
        /// Get Specific Hero
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult<PublicApi.DTO.v1.Hero>> GetHero(Guid id)
        {
            var Hero= await _bll.Heroes.FirstOrDefaultAsync(id);

            if (Hero== null)
            {
                return NotFound(new V1DTO.MessageDTO("Hero not found"));
            }

            return Ok(_mapper.Map(Hero));
        }

        // PUT: api/Heroes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /// <summary>
        /// Update Camapign, only for admins
        /// </summary>
        /// <param name="id"></param>
        /// <param name="Hero"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [Produces("application/json")]
        [Consumes("application/json")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(V1DTO.MessageDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(V1DTO.MessageDTO))]
        public async Task<IActionResult> PutHero(Guid id, V1DTO.Hero Hero)
        {
            if (id != Hero.Id)
            {
                return BadRequest(new V1DTO.MessageDTO("id and Hero.id do not match"));
            }

            await _bll.Heroes.UpdateAsync(_mapper.Map(Hero));
            await _bll.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Heroes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /// <summary>
        /// Create new Hero. only for admins
        /// </summary>
        /// <param name="Hero"></param>
        /// <returns></returns>
        [HttpPost]
        [Produces("application/json")]
        [Consumes("application/json")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(V1DTO.Hero))]
        public async Task<ActionResult<Hero>> PostHero(V1DTO.Hero Hero)
        {
            var bllEntity = _mapper.Map(Hero);
            _bll.Heroes.Add(bllEntity);
            await _bll.SaveChangesAsync();
            Hero.Id = bllEntity.Id;

            return CreatedAtAction("GetHero",
                new {id = Hero.Id, version = HttpContext.GetRequestedApiVersion()?.ToString() ?? "0"},
                Hero);
        }

        // DELETE: api/Heroes/5
        /// <summary>
        /// Delete Hero, only for admins
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Produces("application/json")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        public async Task<ActionResult<Hero>> DeleteHero(Guid id)
        {
            var Hero= await _bll.Heroes.FirstOrDefaultAsync(id);
            if (Hero== null)
            {
                return NotFound(new V1DTO.MessageDTO("Hero not found"));
            }

            await _bll.Heroes.RemoveAsync(Hero);
            await _bll.SaveChangesAsync();

            return StatusCode(204);
        }
    }
}
